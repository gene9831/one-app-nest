import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as path from 'path';
import { GetItemsArgs } from 'src/dto/get-items.args';
import { Drive, DriveDocument, Item, ItemDocument } from 'src/models';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(
    @InjectModel(Drive.name)
    private readonly driveModel: Model<DriveDocument>,
    @InjectModel(Item.name)
    private readonly itemModel: Model<ItemDocument>,
  ) {}

  @Query(() => [Item])
  async items(@Args() args: GetItemsArgs): Promise<ItemDocument[]> {
    const drive = await this.driveModel
      .findOne({ id: args.driveId, 'settings.public': true })
      .exec();
    if (!drive)
      throw new NotFoundException(
        'Can not find the drive. Maybe you have not set the drive to be public',
      );

    const parentPath = path
      .join('/drive/root:', drive.settings.root_path || '', args.folderPath)
      .replace(/\/$/, '');

    const result = await this.itemModel
      .find({
        'parentReference.path': parentPath,
        ...(args.search
          ? { name: { $regex: args.search, $options: 'i' } }
          : {}),
      })
      .sort({ [args.orderBy]: args.order })
      .skip(args.skip)
      .limit(args.limit)
      .exec();

    if (result.length === 0 && parentPath !== '/drive/root:') {
      const idx = parentPath.lastIndexOf('/');
      if (
        !(await this.itemModel.findOne({
          'parentReference.path': parentPath.slice(0, idx),
          name: parentPath.slice(idx + 1),
          folder: { $exists: true },
        }))
      ) {
        throw new NotFoundException('Invalid folder path');
      }
    }

    return result;
  }
}

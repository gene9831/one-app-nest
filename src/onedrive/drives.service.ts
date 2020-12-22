import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as path from 'path';
import { GetItemsArgs } from 'src/dto/get-items.args';
import { Drive, DriveDocument, Item, ItemDocument, Settings } from 'src/models';

@Injectable()
export class DrivesService {
  constructor(
    @InjectModel(Drive.name) private readonly driveModel: Model<DriveDocument>,
    @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
  ) {}

  async findDrive(driveId: string, filter: any = {}): Promise<DriveDocument> {
    const drive = await this.driveModel
      .findOne({ id: driveId, ...filter })
      .exec();
    if (!drive) throw new NotFoundException('Can not find the drive');
    return drive;
  }

  async findDrives(filter: any = {}): Promise<DriveDocument[]> {
    return this.driveModel.find(filter).exec();
  }

  async findItemsPublic(args: GetItemsArgs): Promise<ItemDocument[]> {
    const drive = await this.findDrive(args.driveId, {
      'settings.public': true,
    });

    const parentPath = path
      .join('/drive/root:', drive.settings.root_path, args.folderPath)
      .replace(/\/$/, '');

    const result = await this.itemModel.aggregate([
      {
        $match: {
          'parentReference.path': parentPath,
          ...(args.search
            ? { name: { $regex: args.search, $options: 'i' } }
            : {}),
        },
      },
      {
        $addFields: {
          ftype: { $cond: [{ $ifNull: ['$folder', false] }, 0, 1] },
        },
      },
      { $sort: { ftype: args.order, [args.orderBy]: args.order } },
      { $skip: args.skip },
      { $limit: args.limit },
    ]);

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

  async settingsUpdate(driveId: string, settings: Settings): Promise<boolean> {
    await this.findDrive(driveId);

    if (Object.keys(settings).length === 0) return false;

    const toBeUpdated = {};
    Object.keys(settings).forEach((key) => {
      toBeUpdated[`settings.${key}`] = settings[key];
    });

    const res = await this.driveModel
      .updateOne({ id: driveId }, { $set: toBeUpdated })
      .exec();

    return res.nModified > 0;
  }
}

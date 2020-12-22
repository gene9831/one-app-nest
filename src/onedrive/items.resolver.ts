import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetItemsArgs } from 'src/dto/get-items.args';
import { Item, ItemDocument, MDs } from 'src/models';
import { DrivesService } from './drives.service';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly drivesService: DrivesService) {}

  @Query(() => [Item])
  async itemsPublic(@Args() args: GetItemsArgs): Promise<ItemDocument[]> {
    return this.drivesService.findItemsPublic(args);
  }

  @Query(() => MDs)
  async mdsPublic(
    @Args('driveId') driveId: string,
    @Args('folderPath', { defaultValue: '' }) folderPath?: string,
  ): Promise<MDs> {
    return this.drivesService.findMDsPublic(driveId, folderPath);
  }
}

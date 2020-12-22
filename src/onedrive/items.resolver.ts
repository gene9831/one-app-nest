import { Args, Query, Resolver } from '@nestjs/graphql';
import { GetItemsArgs } from 'src/dto/get-items.args';
import { Item, ItemDocument } from 'src/models';
import { DrivesService } from './drives.service';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(private readonly drivesService: DrivesService) {}

  @Query(() => [Item])
  async items(@Args() args: GetItemsArgs): Promise<ItemDocument[]> {
    return this.drivesService.findItemsPublic(args);
  }
}

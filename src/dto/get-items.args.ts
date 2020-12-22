import { Field, ArgsType } from '@nestjs/graphql';
import { ItemsOrderBy, Order } from './enum-classes';
import { PaginationArgs } from './pagination-args';

@ArgsType()
export class GetItemsArgs extends PaginationArgs {
  @Field()
  driveId: string;

  @Field({ defaultValue: '' })
  folderPath?: string;

  @Field({ nullable: true })
  search?: string;

  @Field(() => Order, { defaultValue: Order.ASC })
  order?: Order;

  @Field(() => ItemsOrderBy, { defaultValue: ItemsOrderBy.NAME })
  orderBy?: ItemsOrderBy;
}

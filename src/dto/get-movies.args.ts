import { Field, ArgsType, Int, registerEnumType } from '@nestjs/graphql';
import { PaginationArgs } from './pagination-args';

enum GenreFilterType {
  OR = '$or',
  AND = '$and',
}

enum Order {
  DESC = -1,
  ASC = 1,
}

enum OrderBy {
  RELEASE_DATE = 'release_date',
}

registerEnumType(GenreFilterType, { name: 'GenreFilterType' });
registerEnumType(Order, { name: 'Order' });
registerEnumType(OrderBy, { name: 'OrderBy' });

@ArgsType()
export class GetMoviesArgs extends PaginationArgs {
  @Field({ nullable: true })
  search?: string;

  @Field(() => [Int], { nullable: true })
  genreIds?: number[];

  @Field(() => GenreFilterType, { defaultValue: GenreFilterType.AND })
  genreFilterType?: GenreFilterType;

  @Field(() => Order, { defaultValue: Order.DESC })
  order?: Order;

  @Field(() => OrderBy, { defaultValue: OrderBy.RELEASE_DATE })
  orderBy?: OrderBy;
}

import { Field, ArgsType, Int } from '@nestjs/graphql';
import { GenreFilterType, MoviesOrderBy, Order } from './enum-classes';
import { PaginationArgs } from './pagination-args';

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

  @Field(() => MoviesOrderBy, { defaultValue: MoviesOrderBy.RELEASE_DATE })
  orderBy?: MoviesOrderBy;
}

import { registerEnumType } from '@nestjs/graphql';

export enum GenreFilterType {
  OR = '$or',
  AND = '$and',
}

export enum Order {
  DESC = -1,
  ASC = 1,
}

export enum MoviesOrderBy {
  RELEASE_DATE = 'release_date',
}

export enum ItemsOrderBy {
  NAME = 'name',
  LAST_MODIFIED_DATETIME = 'lastModifiedDateTime',
}

registerEnumType(GenreFilterType, { name: 'GenreFilterType' });
registerEnumType(Order, { name: 'Order' });
registerEnumType(MoviesOrderBy, { name: 'MoviesOrderBy' });
registerEnumType(ItemsOrderBy, { name: 'ItemsOrderBy' });

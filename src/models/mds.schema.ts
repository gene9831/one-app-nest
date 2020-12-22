import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MDs {
  @Field({ defaultValue: '' })
  head?: string;

  @Field({ defaultValue: '' })
  readme?: string;
}

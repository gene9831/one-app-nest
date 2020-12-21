import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthResult {
  @Field()
  access_token: string;

  @Field(() => Int)
  expires_at: number;
}

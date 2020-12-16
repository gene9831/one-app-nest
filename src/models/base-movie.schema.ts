import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class BaseMovie {
  @Prop(Number)
  @Field(() => Int)
  id: number;

  @Prop(Boolean)
  @Field(() => Boolean)
  adult: boolean;

  @Prop()
  @Field({ nullable: true })
  backdrop_path?: string;

  @Prop([Number])
  @Field(() => [Int], { nullable: true })
  genre_ids?: number[];

  @Prop()
  @Field()
  original_language: string;

  @Prop()
  @Field()
  original_title: string;

  @Prop()
  @Field({ nullable: true })
  overview?: string;

  @Prop()
  @Field({ nullable: true })
  poster_path?: string;

  @Prop()
  @Field({ nullable: true })
  release_date?: string;

  @Prop()
  @Field()
  title: string;

  @Prop(Boolean)
  @Field(() => Boolean, { nullable: true })
  hasVideo?: boolean;
}

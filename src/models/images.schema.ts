import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Image {
  @Field(() => Float)
  aspect_ratio: number;

  @Field()
  file_path: string;

  @Field(() => Int)
  height: number;

  @Field({ nullable: true })
  iso_639_1?: string;

  @Field(() => Int)
  width: number;
}

@ObjectType()
export class Images {
  @Field(() => Int)
  id: number;

  @Field(() => [Image])
  backdrops: Image[];

  @Field(() => [Image])
  posters: Image[];
}

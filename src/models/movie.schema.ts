import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseMovie, Collection, Genre, Images, Person } from '.';

@ObjectType()
export class Company {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  logo_path?: string;

  @Field()
  name: string;

  @Field()
  origin_country: string;
}

@ObjectType()
export class Country {
  @Field()
  iso_3166_1: string;

  @Field()
  name: string;
}

@Schema()
@ObjectType()
export class Movie extends BaseMovie {
  @Prop(Collection)
  @Field(() => Collection, { nullable: true })
  belongs_to_collection?: Collection;

  @Prop([Number])
  @Field(() => [Person], { nullable: true })
  directors?: number[];

  @Prop([Genre])
  @Field(() => [Genre])
  genres: Genre[];

  @Prop()
  @Field({ nullable: true })
  homepage?: string;

  @Prop(Images)
  @Field(() => Images, { nullable: true })
  images?: Images;

  @Prop()
  @Field({ nullable: true })
  imdb_id?: string;

  @Prop([Company])
  @Field(() => [Company], { nullable: true })
  production_companies?: Company[];

  @Prop([Country])
  @Field(() => [Country], { nullable: true })
  production_countries?: Country[];

  @Prop()
  @Field(() => Int, { nullable: true })
  runtime?: number;

  @Prop()
  @Field({ nullable: true })
  status?: string;
}

export type MovieDocument = Movie & Document;
export const MovieSchema = SchemaFactory.createForClass(Movie);

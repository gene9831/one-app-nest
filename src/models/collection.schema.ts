import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseMovie } from '.';

@Schema()
@ObjectType()
export class Collection {
  @Prop(Number)
  @Field(() => Int)
  id: number;

  @Prop()
  @Field({ nullable: true })
  backdrop_path?: string;

  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field({ nullable: true })
  overview?: string;

  @Prop([BaseMovie])
  @Field(() => [BaseMovie], { nullable: true })
  parts?: BaseMovie[];

  @Prop()
  @Field({ nullable: true })
  poster_path?: string;
}

export type CollectionDocument = Collection & Document;
export const CollectionSchema = SchemaFactory.createForClass(Collection);

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class Genre {
  @Prop(Number)
  @Field(() => Int)
  id: number;

  @Prop()
  @Field()
  name: string;
}

export type GenreDocument = Genre & Document;
export const GenreSchema = SchemaFactory.createForClass(Genre);

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class Person {
  @Prop(Number)
  @Field(() => Int)
  id: number;

  @Prop([String])
  @Field(() => [String], { nullable: true })
  also_known_as?: string[];

  @Prop()
  @Field({ nullable: true })
  birthday?: string;

  @Prop()
  @Field({ nullable: true })
  deathday?: string;

  @Prop()
  @Field({ nullable: true })
  imdb_id?: string;

  @Prop()
  @Field({ nullable: true })
  known_for_department?: string;

  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field({ nullable: true })
  place_of_birth?: string;

  @Prop()
  @Field({ nullable: true })
  profile_path?: string;
}

export type PersonDocument = Person & Document;
export const PersonSchema = SchemaFactory.createForClass(Person);

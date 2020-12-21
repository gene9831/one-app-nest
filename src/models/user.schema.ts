import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
@ObjectType()
export class User {
  @Prop()
  @Field()
  username: string;

  @Prop()
  @Field()
  password: string;
}

export type UserDocument = User & Document;

@Schema()
@ObjectType()
export class Admin extends User {}

export type AdminDocument = Admin & Document;
export const AdminSchema = SchemaFactory.createForClass(Admin);

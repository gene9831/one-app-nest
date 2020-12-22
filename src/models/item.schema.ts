import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
class File {
  @Field()
  mimeType: string;
}

@ObjectType()
class Folder {
  @Field(() => Int)
  childCount: number;
}

@ObjectType()
class ParentReference {
  @Field()
  driveId: string;

  @Field()
  driveType: string;

  // 只有root item的parentReference才没有下面两个字段
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  path?: string;
}

@Schema()
@ObjectType()
export class Item {
  @Prop()
  @Field()
  id: string;

  @Prop()
  @Field()
  createdDateTime: string;

  @Prop(File)
  @Field(() => File, { nullable: true })
  file?: File;

  @Prop(Folder)
  @Field(() => Folder, { nullable: true })
  folder?: Folder;

  @Prop()
  @Field()
  lastModifiedDateTime: string;

  @Prop()
  @Field()
  name: string;

  @Prop(ParentReference)
  // @Field(() => ParentReference)
  parentReference: ParentReference;

  @Prop(Number)
  @Field(() => Float)
  size: number;

  @Prop()
  content?: string;

  @Prop(Number)
  @Field(() => Int, { nullable: true })
  movie_id?: number;
}

export type ItemDocument = Item & Document;
export const ItemSchema = SchemaFactory.createForClass(Item);

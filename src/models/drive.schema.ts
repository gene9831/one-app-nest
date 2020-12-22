import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
class Identity {
  @Field({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  id?: string;
}

@ObjectType()
class IdentitySet {
  @Field(() => Identity, { nullable: true })
  application?: Identity;

  @Field(() => Identity, { nullable: true })
  device?: Identity;

  @Field(() => Identity, { nullable: true })
  user?: Identity;
}

@ObjectType()
class Quota {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  used: number;

  @Field(() => Int)
  remaining: number;

  @Field(() => Int)
  deleted: number;

  @Field()
  state: string;
}

@ObjectType()
export class Settings {
  @Field({ nullable: true })
  root_path?: string;

  @Field({ nullable: true })
  movies_path?: string;

  @Field(() => Boolean, { nullable: true })
  public?: boolean;
}

@Schema()
@ObjectType()
export class SimpleDrive {
  @Prop()
  @Field()
  id: string;
}

@Schema()
@ObjectType()
export class Drive extends SimpleDrive {
  @Prop()
  @Field()
  createdDateTime: string;

  @Prop()
  @Field()
  description: string;

  @Prop()
  @Field()
  driveType: string;

  @Prop()
  @Field()
  lastModifiedDateTime: string;

  @Prop()
  @Field()
  name: string;

  @Prop(IdentitySet)
  @Field(() => IdentitySet, { nullable: true })
  owner?: IdentitySet;

  @Prop(Quota)
  @Field(() => Quota, { nullable: true })
  quota?: Quota;

  // 下面字段暂不导出到GraphQL
  @Prop()
  base_down_url?: string;

  @Prop()
  delta_link?: string;

  @Prop(Settings)
  @Field(() => Settings, { nullable: true })
  settings?: Settings;

  @Prop({ type: MongooseSchema.Types.Map })
  token?: any;
}

export type DriveDocument = Drive & Document;
export const DriveSchema = SchemaFactory.createForClass(Drive);

export type SimpleDriveDocument = SimpleDrive & Document;
export const SimpleScheme = SchemaFactory.createForClass(SimpleDrive);

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
  @Prop(Number)
  @Field(() => Int)
  total: number;

  @Prop(Number)
  @Field(() => Int)
  used: number;

  @Prop(Number)
  @Field(() => Int)
  remaining: number;

  @Prop(Number)
  @Field(() => Int)
  deleted: number;

  @Prop()
  @Field()
  state: string;
}

@Schema()
@ObjectType()
export class Drive {
  @Prop()
  @Field()
  id: string;

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

  @Prop({ type: MongooseSchema.Types.Map })
  settings?: any;

  @Prop({ type: MongooseSchema.Types.Map })
  token?: any;
}

export type DriveDocument = Drive & Document;
export const DriveSchema = SchemaFactory.createForClass(Drive);

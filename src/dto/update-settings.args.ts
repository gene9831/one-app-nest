import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@ArgsType()
export class SettingsArgs {
  @IsString()
  @Field()
  driveId: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  root_path?: string;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  movies_path?: string;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  public?: boolean;
}

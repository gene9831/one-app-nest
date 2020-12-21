import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GqlJwtAuthGuard } from 'src/auth/gql-jwt-auth.guard';
import { Drive, DriveDocument } from 'src/models';

@Resolver(() => Drive)
export class DrivesResolver {
  constructor(
    @InjectModel(Drive.name)
    private readonly driveModel: Model<DriveDocument>,
  ) {}

  @Query(() => [Drive])
  @UseGuards(GqlJwtAuthGuard)
  async drives(): Promise<DriveDocument[]> {
    return this.driveModel.find().exec();
  }
}

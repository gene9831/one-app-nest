import { Query, Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Drive, DriveDocument } from 'src/models';

@Resolver(() => Drive)
export class DrivesResolver {
  constructor(
    @InjectModel(Drive.name)
    private readonly driveModel: Model<DriveDocument>,
  ) {}

  @Query(() => [Drive])
  async drives(): Promise<DriveDocument[]> {
    return await this.driveModel.find().exec();
  }
}

import { Query, Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Drive,
  DriveDocument,
  SimpleDrive,
  SimpleDriveDocument,
} from 'src/models';

@Resolver(() => SimpleDrive)
export class DrivesInfoResolver {
  constructor(
    // 这里model直接用Drive Model，同一个数据库
    @InjectModel(Drive.name)
    private readonly driveModel: Model<DriveDocument>,
  ) {}

  @Query(() => [SimpleDrive])
  async drivesInfo(): Promise<SimpleDriveDocument[]> {
    return this.driveModel.find().exec();
  }
}

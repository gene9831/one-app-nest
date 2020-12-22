import { Query, Resolver } from '@nestjs/graphql';
import { SimpleDrive, SimpleDriveDocument } from 'src/models';
import { DrivesService } from './drives.service';

@Resolver(() => SimpleDrive)
export class DrivesPublicResolver {
  constructor(private readonly drivesService: DrivesService) {}

  @Query(() => [SimpleDrive])
  async drivesPublic(): Promise<SimpleDriveDocument[]> {
    return this.drivesService.findDrives({ 'settings.public': true });
  }
}

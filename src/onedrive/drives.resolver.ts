import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AdminService } from 'src/admin/admin.service';
import { GqlJwtAuthGuard } from 'src/auth/gql-jwt-auth.guard';
import { CurrentUser } from 'src/decorators/gql-user.decorator';
import { SettingsArgs } from 'src/dto/update-settings.args';
import { Drive, DriveDocument } from 'src/models';
import { DrivesService } from './drives.service';

@Resolver(() => Drive)
export class DrivesResolver {
  constructor(
    private readonly drivesService: DrivesService,
    private readonly adminService: AdminService,
  ) {}

  @Query(() => [Drive])
  @UseGuards(GqlJwtAuthGuard)
  async drives(@CurrentUser() user: any): Promise<DriveDocument[]> {
    if (!(await this.adminService.findOne(user.username))) {
      throw new UnauthorizedException();
    }
    return this.drivesService.findDrives();
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlJwtAuthGuard)
  async driveSettings(@Args() args: SettingsArgs) {
    const { driveId, ...others } = args;
    return this.drivesService.settingsUpdate(driveId, others);
  }
}

import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminService } from 'src/admin/admin.service';
import { GqlJwtAuthGuard } from 'src/auth/gql-jwt-auth.guard';
import { CurrentUser } from 'src/decorators/gql-user.decorator';
import { Drive, DriveDocument } from 'src/models';

@Resolver(() => Drive)
export class DrivesResolver {
  constructor(
    @InjectModel(Drive.name)
    private readonly driveModel: Model<DriveDocument>,
    private readonly adminService: AdminService,
  ) {}

  @Query(() => [Drive])
  @UseGuards(GqlJwtAuthGuard)
  async drives(@CurrentUser() user: any): Promise<DriveDocument[]> {
    if (!(await this.adminService.findOne(user.username))) {
      throw new UnauthorizedException();
    }
    return this.driveModel.find().exec();
  }
}

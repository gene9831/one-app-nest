import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from 'src/admin/admin.module';
import { Drive, DriveSchema } from 'src/models';
import { DrivesInfoResolver } from './drives-info.resolver';
import { DrivesResolver } from './drives.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Drive.name,
        schema: DriveSchema,
        collection: 'onedrive.drives',
      },
    ]),
    AdminModule,
  ],
  providers: [DrivesResolver, DrivesInfoResolver],
})
export class OnedriveModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Drive, DriveSchema } from 'src/models';
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
  ],
  providers: [DrivesResolver],
})
export class OnedriveModule {}

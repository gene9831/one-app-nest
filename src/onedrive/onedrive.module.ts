import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from 'src/admin/admin.module';
import { Drive, DriveSchema, Item, ItemSchema } from 'src/models';
import {
  DrivesPublicResolver,
  DrivesResolver,
  DrivesService,
  ItemsResolver,
} from '.';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Drive.name,
        schema: DriveSchema,
        collection: 'onedrive.drives',
      },
      {
        name: Item.name,
        schema: ItemSchema,
        collection: 'onedrive.items',
      },
    ]),
    AdminModule,
  ],
  providers: [
    DrivesService,
    DrivesResolver,
    DrivesPublicResolver,
    ItemsResolver,
  ],
})
export class OnedriveModule {}

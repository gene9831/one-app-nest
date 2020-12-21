import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/models';
import { AdminService } from './admin.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
        collection: 'admin',
      },
    ]),
  ],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}

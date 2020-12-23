import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { OnedriveModule } from './onedrive';
import { TmdbMoviesModule } from './tmdb-movies';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { GqlConfigService } from './config/gql-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongoUrl'),
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
    OnedriveModule,
    TmdbMoviesModule,
    AuthModule,
    AdminModule,
  ],
})
export class AppModule {}

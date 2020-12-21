import { HttpException, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import { OnedriveModule } from './onedrive';
import { TmdbMoviesModule } from './tmdb-movies';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    GraphQLModule.forRoot({
      playground: process.env.GQL_PLAYGROUD === `${true}`,
      autoSchemaFile: 'schema.gql',
      debug: process.env.DEBUG === `${true}`,
      formatError: (err: GraphQLError) => {
        if (err.originalError instanceof HttpException) {
          const stacktrace = err.extensions?.exception?.stacktrace;
          return new GraphQLError(
            (err.originalError as any).response.message,
            err.nodes,
            err.source,
            err.positions,
            err.path,
            err.originalError,
            {
              code: err.originalError.constructor.name,
              ...(stacktrace ? { exception: { stacktrace: stacktrace } } : {}),
            },
          );
        }
        return err;
      },
    }),
    OnedriveModule,
    TmdbMoviesModule,
    AuthModule,
    AdminModule,
  ],
})
export class AppModule {}

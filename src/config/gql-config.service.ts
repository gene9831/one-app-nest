import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createGqlOptions(): GqlModuleOptions {
    console.log(this.configService);
    return {
      playground: this.configService.get<boolean>('gqlPlayground'),
      autoSchemaFile: 'schema.gql',
      debug: this.configService.get<boolean>('debug'),
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
    };
  }
}

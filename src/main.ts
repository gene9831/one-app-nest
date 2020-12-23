import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  await app.listen(port);

  console.log(`
  ${String.fromCodePoint(0x1f680)} Server is running!
  Listening on port ${port}
`);
  if (configService.get<boolean>('gqlPlayground')) {
    console.log(`  GraphQL playground at http://localhost:${port}/graphql
`);
  }
}
bootstrap();

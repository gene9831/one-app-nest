import './env';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
  console.log(`
  ${String.fromCodePoint(0x1f680)} Server is running!
  Listening on port ${process.env.PORT}
  GraphQL playground at http://localhost:${process.env.PORT}/graphql
`);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();

const serverPort = process.env.PORT || 3000;

const bootstrap = async (port: string | number) => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
};

// tslint:disable-next-line: no-console
console.log(`Starting on port ${serverPort}...`);
bootstrap(serverPort);

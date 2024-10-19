import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('json')
  async getSwaggerJson() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('The API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    return document;
  }
}

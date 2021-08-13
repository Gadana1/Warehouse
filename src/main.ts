import * as dotenv from 'dotenv';
// Configure dot env
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { CrudConfigService } from '@nestjsx/crud';
// Global CRUD config: Must be defined before Appmodule
CrudConfigService.load({
  query: {
    limit: 20,
    alwaysPaginate: true,
  },
});

import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as cookie_parser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

(async () => {
  // Create Nest App using AppModule as root module
  const app = await NestFactory.create(AppModule);

  // Add helmet for security
  app.use(
    helmet({
      referrerPolicy: {
        policy: 'no-referrer',
      },
      contentSecurityPolicy: false,
    }),
  );

  // Enable CORS
  app.enableCors({
    maxAge: 86400,
  });

  // Use to parse cookie headers
  app.use(cookie_parser());

  // Swagger documentation builder
  const config = new DocumentBuilder()
    .setTitle('Warehouse Management System')
    .setDescription('API to manage warehouse')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .addTag('Home')
    .addTag('Auth')
    .addTag('Role')
    .addTag('User')
    .addTag('Product')
    .addTag('Warehouse')
    .addTag('Warehouse Product')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Start
  await app.listen(8000);
})();

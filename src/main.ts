import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as cookie_parser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  // Create Nest App using AppModule as root module
  const app = await NestFactory.create(AppModule);
  
  // Add helmet for security
  app.use(helmet({
    referrerPolicy: {
      policy: 'no-referrer'
    },
    contentSecurityPolicy: false,
  }));

  // Enable CORS
  app.enableCors({
    maxAge: 86400
  });

  // Use to parse cookie headers
  app.use(cookie_parser())

  // Enable CSRF or XSRF Protection
  app.use(csurf({cookie: true}));

  // Swagger documentation builder
  const config = new DocumentBuilder()
    .setTitle('Warehouse Management System')
    .setDescription('API to manage warehouse')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Start
  await app.listen(8000);
}
bootstrap();

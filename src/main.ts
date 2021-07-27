import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Add helmet for security
  app.use(helmet({
    referrerPolicy: {
      policy: 'no-referrer'
    }
  }));
  // Enable CORS
  app.enableCors({
    maxAge: 86400
  });
  // Enable CSRF or XSRF Protection
  app.use(csurf());
  await app.listen(8000);
}
bootstrap();

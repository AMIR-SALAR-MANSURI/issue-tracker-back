import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

config(); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID);
   const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for my NestJS project')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))
;app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });
/

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';


config(); 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID);
   const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation for my NestJS project')
    .setVersion('1.0')
    .addBearerAuth() // Enables JWT authentication in Swagger (optional)
    .build();

app.enableCors({
    origin: '*', // Allow all origins (not recommended for production)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Swagger UI available at /api/docs
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

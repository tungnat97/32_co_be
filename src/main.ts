import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('32 CO API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // Optional: Indicates the format of the token
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'admin-auth',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT', // Optional: Indicates the format of the token
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'customer-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // 'api' is the path where Swagger UI will be accessible
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

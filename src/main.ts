import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe';

(async () => {
  const app = await NestFactory.create(AppModule);

  SwaggerModule.setup(
    '/api/docs',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder().setTitle('backend').setVersion('Mk I').build(),
    ),
  );

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 8080);
})();

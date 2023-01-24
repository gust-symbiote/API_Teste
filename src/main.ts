import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Fórum Lady Debug')
    .setDescription('Projeto do Fórum Lady Debug')
    .setContact('Equipe 3 - Generation', 'http://github.com/Equipe03-Generation', 'forumdevgirls@gmail.com')
    .setVersion('3.0')
    .addBearerAuth()
    .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/swagger', app, document)

  process.env.TZ = '-03:00'
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

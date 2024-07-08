import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const setUpSwagger = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Ecommerce Bardo')
    .setDescription('API para gestionar los productos de un ecommerce')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};

export { setUpSwagger };

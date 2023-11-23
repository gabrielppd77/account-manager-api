import { NestFactory } from '@nestjs/core';

import { AppModule } from './modules/app.module';

import { EnvService } from './modules/env/env.service';

import { SwaggerConfig } from './config/swagger.config';
import { ValidationPipeConfig } from './config/validation-pipe.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerConfig.createDocument(app);
  ValidationPipeConfig.configGlobalPipes(app);

  const envService = app.get(EnvService);
  const port = envService.get('PORT');

  await app.listen(port);
}
bootstrap();

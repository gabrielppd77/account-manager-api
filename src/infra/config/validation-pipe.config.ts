import { INestApplication, ValidationPipe } from '@nestjs/common';

export class ValidationPipeConfig {
  static configGlobalPipes(app: INestApplication) {
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
  }
}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { AuthModule } from '@infra/auth/auth.module';

import { ValidateLoginMiddleware } from './middlewares/validate-login.middleware';

import { UserController } from './controllers/user.controller';

import { CreateUser } from '@app/use-cases/create-user';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UserController],
  providers: [CreateUser],
})
export class HttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateLoginMiddleware).forRoutes('/user/login');
  }
}

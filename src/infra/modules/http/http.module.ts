import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { CreateAccountController } from './controllers/create-account.controller';
import { AuthenticateController } from './controllers/authenticate.controller';

import { CreateAccount } from '@domain/use-cases/create-account';
import { AuthenticateAccount } from '@domain/use-cases/authenticate-account';

@Module({
  imports: [DatabaseModule],
  controllers: [CreateAccountController, AuthenticateController],
  providers: [CreateAccount, AuthenticateAccount],
})
export class HttpModule {}

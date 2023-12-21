import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { MailModule } from '../mail/mail.module';

import { CreateAccountController } from './controllers/create-account.controller';
import { AuthenticateController } from './controllers/authenticate.controller';
import { ChangePasswordController } from './controllers/change-password.controller';

import { CreateAccount } from '@domain/use-cases/create-account';
import { AuthenticateAccount } from '@domain/use-cases/authenticate-account';
import { ChangePassword } from '@domain/use-cases/change-password';

@Module({
  imports: [DatabaseModule, MailModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    ChangePasswordController,
  ],
  providers: [CreateAccount, AuthenticateAccount, ChangePassword],
})
export class HttpModule {}

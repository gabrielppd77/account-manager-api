import { Module } from '@nestjs/common';

import { EnvModule } from './env/env.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';

// import { CreateAccountController } from './controllers/create-account.controller';
// import { AuthenticateController } from './controllers/authenticate.controller';

@Module({
  imports: [EnvModule, DatabaseModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

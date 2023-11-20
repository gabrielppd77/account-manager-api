import { Module } from '@nestjs/common';

import { EnvModule } from './env/env.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from './http/http.module';

@Module({
  imports: [EnvModule, DatabaseModule, AuthModule, HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

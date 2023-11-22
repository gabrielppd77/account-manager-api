import { Module } from '@nestjs/common';

import { EnvModule } from './env/env.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from './http/http.module';

@Module({
  imports: [EnvModule, AuthModule, HttpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

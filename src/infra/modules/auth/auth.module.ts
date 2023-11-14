import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EnvModule } from '../env/env.module';

import { JwtStrategy } from './strategies/jwt.strategy';

import { EnvService } from '../env/env.service';

@Module({
  imports: [
    PassportModule,
    EnvModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory(envService: EnvService) {
        const privateKey = envService.get('JWT_PRIVATE_KEY');
        const publicKey = envService.get('JWT_PUBLIC_KEY');
        return {
          signOptions: { algorithm: 'RS256' },
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
        };
      },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}

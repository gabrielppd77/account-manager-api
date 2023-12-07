import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

import { AccountRepository } from '@domain/repositories/account.repository';
import { PrismaAccountRepository } from './repositories/prisma-account.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: AccountRepository,
      useClass: PrismaAccountRepository,
    },
  ],
  exports: [AccountRepository],
})
export class PrismaModule {}

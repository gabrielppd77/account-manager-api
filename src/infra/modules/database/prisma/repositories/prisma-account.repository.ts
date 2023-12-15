import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

import { AccountRepository } from '@domain/repositories/account.repository';
import { Account } from '@domain/entities/account';

import { PrismaAccountMapper } from '../mappers/prisma-account-mapper';

@Injectable()
export class PrismaAccountRepository implements AccountRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Account | null> {
    const accountFinded = await this.prisma.account.findUnique({
      where: {
        email,
      },
    });
    if (!accountFinded) return null;
    return PrismaAccountMapper.toDomain(accountFinded);
  }

  async findById(accountId: string): Promise<Account | null> {
    const accountFinded = await this.prisma.account.findUnique({
      where: {
        id: accountId,
      },
    });
    if (!accountFinded) return null;
    return PrismaAccountMapper.toDomain(accountFinded);
  }

  async create(account: Account): Promise<void> {
    const accountToPrisma = PrismaAccountMapper.toPrisma(account);
    await this.prisma.account.create({ data: accountToPrisma });
  }

  async updatePassword(accountId: string, newPassword: string): Promise<void> {
    await this.prisma.account.update({
      where: {
        id: accountId,
      },
      data: {
        password: newPassword,
      },
    });
  }
}

import { Account } from '@domain/entities/account';
import { Account as AccountPrisma } from '@prisma/client';

export class PrismaAccountMapper {
  static toPrisma(account: Account): AccountPrisma {
    return {
      id: account.id.toValue(),
      name: account.name,
      email: account.email,
      password: account.password,
    };
  }
  static toDomain(accountPrisma: AccountPrisma): Account {
    return new Account(
      {
        name: accountPrisma.name,
        email: accountPrisma.email,
        password: accountPrisma.password,
      },
      accountPrisma.id,
    );
  }
}

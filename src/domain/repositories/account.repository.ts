import { Account } from '@domain/entities/account';

export abstract class AccountRepository {
  abstract findByEmail(email: string): Promise<Account | null>;
  abstract findById(accountId: string): Promise<Account | null>;
  abstract create(account: Account): Promise<void>;
  abstract updatePassword(
    accountId: string,
    newPassword: string,
  ): Promise<void>;
}

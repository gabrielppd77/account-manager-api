import { Account } from '@domain/entities/account';

export abstract class AccountRepository {
  abstract findByEmail(email: string): Promise<Account | null>;
  abstract create(account: Account): Promise<void>;
}

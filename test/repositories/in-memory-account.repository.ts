import { Account } from '@domain/entities/account';
import { AccountRepository } from '@domain/repositories/account.repository';

export class InMemoryAccountRepository extends AccountRepository {
  public accounts: Account[] = [];

  async create(account: Account): Promise<void> {
    this.accounts.push(account);
  }

  async updatePassword(accountId: string, newPassword: string): Promise<void> {
    const accountFinded = this.accounts.find(
      (account) => account.id.toValue() === accountId,
    );
    if (accountFinded) {
      accountFinded.password = newPassword;
    }
  }

  async findByEmail(email: string): Promise<Account | null> {
    const accountFinded = this.accounts.find(
      (account) => account.email === email,
    );
    return accountFinded || null;
  }

  async findById(accountId: string): Promise<Account | null> {
    const accountFinded = this.accounts.find(
      (account) => account.id.toValue() === accountId,
    );
    return accountFinded || null;
  }
}

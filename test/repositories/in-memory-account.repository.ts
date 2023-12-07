import { Account } from '@domain/entities/account';
import { AccountRepository } from '@domain/repositories/account.repository';

export class InMemoryAccountRepository extends AccountRepository {
  public accounts: Account[] = [];
  async create(account: Account): Promise<void> {
    this.accounts.push(account);
  }
  async findByEmail(email: string): Promise<Account | null> {
    const accountFinded = this.accounts.find(
      (account) => account.email === email,
    );
    return accountFinded || null;
  }
}

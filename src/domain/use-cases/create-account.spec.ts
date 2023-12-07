import { Account } from '@domain/entities/account';
import { InMemoryAccountRepository } from '@test/repositories/in-memory-account.repository';

import { CreateAccount } from './create-account';
import { AccountEmailAlreadyExistsException } from '../exceptions/account-email-already-exists.exception';

describe('CreateAccount', () => {
  it('should be able to create an account', async () => {
    const accountRepository = new InMemoryAccountRepository();
    const createAccount = new CreateAccount(accountRepository);

    const accountToCreate = {
      email: 'jondoe@email.com',
      name: 'Jon Doe',
      password: '1234',
    };

    await createAccount.execute(accountToCreate);

    const accountCreated = accountRepository.accounts[0];

    expect(accountCreated).toBeTruthy();

    expect(accountCreated.id).toBeDefined();
    expect(accountCreated.password).toBeDefined();
    expect(accountCreated.password).not.toEqual(accountToCreate.password);
    expect(accountCreated.email).toEqual(accountToCreate.email);
  });

  it('should show error when found that email already exists', async () => {
    const accountRepository = new InMemoryAccountRepository();
    const createAccount = new CreateAccount(accountRepository);

    const emailRepeated = 'email@valid.com';

    const newAccount = new Account({
      email: emailRepeated,
      password: '1234',
      name: 'jondoe',
    });

    await accountRepository.create(newAccount);

    expect(
      async () =>
        await createAccount.execute({
          email: emailRepeated,
          password: '1234',
          name: 'jondoe',
        }),
    ).rejects.toThrow(AccountEmailAlreadyExistsException);
  });
});

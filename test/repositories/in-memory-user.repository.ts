import { User } from '@domain/entities/user';
import { UserRepository } from '@domain/repositories/user.repository';

export class InMemoryUserRepository extends UserRepository {
  public users: User[] = [];
  async create(user: User): Promise<void> {
    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    const userFinded = this.users.find((user) => user.email === email);
    return userFinded || null;
  }
}

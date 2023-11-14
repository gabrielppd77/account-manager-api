import { User } from '@domain/entities/user';
import { User as UserPrisma } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User): UserPrisma {
    return {
      id: user.id.toValue(),
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
  static toDomain(userPrisma: UserPrisma): User {
    return new User(
      {
        name: userPrisma.name,
        email: userPrisma.email,
        password: userPrisma.password,
      },
      userPrisma.id,
    );
  }
}

import { Entity } from '@core/common/entities/entity';

interface UserProps {
  name: string;
  email: string;
  password: string;
}

export class User extends Entity<UserProps> {
  public get name() {
    return this.props.name;
  }

  public get email() {
    return this.props.email;
  }

  public get password() {
    return this.props.password;
  }
}

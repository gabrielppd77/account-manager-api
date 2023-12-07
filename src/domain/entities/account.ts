import { Entity } from '@core/common/entities/entity';

interface AccountProps {
  name: string;
  email: string;
  password: string;
}

export class Account extends Entity<AccountProps> {
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

import { Entity } from '@core/common/entities/entity';

interface AccountProps {
  name: string;
  email: string;
  password: string;
}

export class Account extends Entity<AccountProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }
}

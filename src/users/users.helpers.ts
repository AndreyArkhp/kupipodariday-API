import { User } from './entities/user.entity';

export class UsersHelpers {
  removePasswordFromResponse(user: User) {
    const { password, ...res } = user;
    return res;
  }
}

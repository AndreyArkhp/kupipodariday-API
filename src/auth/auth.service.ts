import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  validatePassword(username: string, password: string) {
    return 'auth';
  }
  auth(user: User) {
    return { access_token: this.jwtService.sign({ sub: user.id }) };
  }
}

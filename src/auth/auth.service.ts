import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
import * as bcript from 'bcrypt';
import { UsersHelpers } from 'src/users/users.helpers';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly usersHelpers: UsersHelpers,
  ) {}
  async validatePassword(username: string, password: string) {
    const user = await this.userService.findByUserName(username);
    if (user && (await bcript.compare(password, user.password))) {
      return this.usersHelpers.removePasswordFromResponse(user);
    }
    return null;
  }
  auth(user: ResponseUserDto) {
    return { access_token: this.jwtService.sign({ sub: user.id }) };
  }
}

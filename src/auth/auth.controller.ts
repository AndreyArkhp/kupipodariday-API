import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { userAboutDefault } from 'src/common/constants';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RequestWithUser } from 'src/types';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signin(@Req() req: RequestWithUser) {
    return this.authService.auth(req.user);
  }
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const userData = createUserDto.about
      ? createUserDto
      : { ...createUserDto, about: userAboutDefault };
    const user = await this.usersService.create(userData);
    return user;
  }
}

import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { userAboutDefault } from 'src/common/constants';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local-guard';

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @UseGuards(LocalGuard)
  @Post('signin')
  async signin(@Req() user: ResponseUserDto) {
    return this.authService.auth(user);
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

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '../types';
import { FindUsersDto } from './dto/find-user.dto';
import { WishesService } from 'src/wishes/wishes.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  @Get('me')
  find(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Patch('me')
  updateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: RequestWithUser,
  ) {
    return this.usersService.update(updateUserDto, req);
  }

  @Get('me/wishes')
  findUserWishes(@Req() req: RequestWithUser) {
    return this.wishesService.findUserWishes(req.user);
  }

  @Get(':username')
  findUserByName(@Param('username') username: string) {
    return this.usersService.findByUserName(username);
  }

  @Get(':username/wishes')
  async findWishesByUserName(@Param('username') username: string) {
    const user = await this.usersService.findByUserName(username);
    return this.wishesService.findUserWishes(user);
  }

  @Post('find')
  findMany(@Body() findUsersDto: FindUsersDto) {
    return this.usersService.findMany(findUsersDto);
  }
}

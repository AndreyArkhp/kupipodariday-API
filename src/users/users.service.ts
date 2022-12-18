import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { saltRounds } from 'src/common/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return bcrypt
      .hash(createUserDto.password, saltRounds)
      .then((hash) =>
        this.usersRepository.save({ ...createUserDto, password: hash } as User),
      );
  }

  async findOne(username: string) {
    const user = await this.usersRepository.findOneBy({ username });
    const { password, ...res } = user;
    return res;
  }
}

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { saltRounds } from 'src/common/constants';
import { UsersHelpers } from './users.helpers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private usersHelpers: UsersHelpers,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const hash = await bcrypt.hash(createUserDto.password, saltRounds);
      return this.usersHelpers.removePasswordFromResponse(
        await this.usersRepository.save({
          ...createUserDto,
          password: hash,
        } as User),
      );
    } catch (err) {
      return console.log(err);
    }
  }

  async findById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    return this.usersHelpers.removePasswordFromResponse(user);
  }

  async findByUserName(username: string) {
    const user = await this.usersRepository.findOneBy({ username });
    return user;
  }
}

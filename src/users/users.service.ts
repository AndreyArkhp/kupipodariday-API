import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { saltRounds } from 'src/common/constants';
import { RequestWithUser } from 'src/types';
import { FindUsersDto } from './dto/find-user.dto';
import { ResponseUserPublicDto } from './dto/response-user-public.dto';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const hash = await bcrypt.hash(createUserDto.password, saltRounds);
      return await this.usersRepository.save({
        ...createUserDto,
        password: hash,
      } as User);
    } catch (err) {
      return console.log(err);
    }
  }

  async findById(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async findByUserName(username: string, password = false) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .addSelect(password ? 'user.password' : '')
      .where('user.username = :username', { username })
      .getOne();
    return user;
  }

  async update(updateData: UpdateUserDto, request: RequestWithUser) {
    const { password } = updateData;
    if (password) {
      const hash = await bcrypt.hash(password, saltRounds);
      updateData = { ...updateData, password: hash };
    }
    const { affected } = await this.usersRepository.update(
      request.user.id,
      updateData,
    );
    if (!affected) throw new NotFoundException();
    return { status: 'success' };
  }

  async findMany(findUsersDto: FindUsersDto) {
    return await this.usersRepository.find({
      where: [
        { email: ILike(findUsersDto.query) },
        { username: ILike(findUsersDto.query) },
      ],
    });
  }
}

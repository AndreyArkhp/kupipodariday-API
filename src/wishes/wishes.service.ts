import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestWithUser } from 'src/types';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}
  async create(createWishDto: CreateWishDto, req: RequestWithUser) {
    console.log(req.user);

    return await this.wishRepository.save({
      ...createWishDto,
      owner: req.user,
    });
  }

  findAll() {
    return this.wishRepository.find({
      relations: { owner: true, offers: true },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} wish`;
  }

  update(id: number, updateWishDto: UpdateWishDto) {
    return `This action updates a #${id} wish`;
  }

  remove(id: number) {
    return `This action removes a #${id} wish`;
  }

  findUserWishes(user: User) {
    return this.findAll().then((wishes) => {
      return wishes.filter((wish) => wish.owner.id === user.id);
    });
  }
}

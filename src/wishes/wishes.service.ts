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
    await this.wishRepository.save({
      ...createWishDto,
      owner: req.user,
    });
    return {};
  }

  findAll() {
    return this.wishRepository.find({
      relations: { owner: true, offers: true },
    });
  }

  findOne(id: number) {
    return this.wishRepository.findOne({
      where: {
        id,
      },
      relations: {
        owner: true,
      },
    });
  }

  updateOne(id: number) {
    return {};
  }

  async remove(id: number) {
    const wish = await this.findOne(id);
    try {
      await this.wishRepository.delete(id);
      return wish;
    } catch (err) {
      return err;
    }
  }

  async findUserWishes(user: User) {
    const wishes = await this.findAll();
    return wishes.filter((wish) => wish.owner.id === user.id);
  }

  async findTop() {
    return await this.wishRepository.find({
      order: { copied: 'DESC' },
      take: 20,
    });
  }

  async findLast() {
    return await this.wishRepository.find({
      order: { createdAt: 'DESC' },
      take: 40,
    });
  }

  async copyWish(id: number, req: RequestWithUser) {
    const wish = await this.findOne(id);
    await this.wishRepository.update(id, { copied: ++wish.copied });
    const { id: wishId, createdAt, updatedAt, owner, ...rest } = wish;
    const newWish = {
      ...rest,
      raised: '0',
    };
    return this.create(newWish, req);
  }
}

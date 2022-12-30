import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestWithUser } from 'src/types';
import { WishesService } from 'src/wishes/wishes.service';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    private readonly wishesService: WishesService,
  ) {}

  async create(createWishlistDto: CreateWishlistDto, req: RequestWithUser) {
    const wishes = (await this.wishesService.findAll()).filter((wish) =>
      createWishlistDto.itemsId.includes(wish.id),
    );
    if (wishes.length === 0) throw new BadRequestException();
    const wishlist = new Wishlist();
    wishlist.name = createWishlistDto.name;
    wishlist.image = createWishlistDto.image;
    wishlist.items = wishes;
    wishlist.owner = req.user;
    return this.wishlistRepository.save(wishlist);
  }

  findAll() {
    return this.wishlistRepository.find({
      relations: { items: true, owner: true },
    });
  }

  findOne(id: number) {
    return this.wishlistRepository.findOne({
      where: { id },
      relations: { items: true, owner: true },
    });
  }

  async update(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
    req: RequestWithUser,
  ) {
    if (req.user.id === (await this.findOne(id)).owner.id) {
      const wishlist = new Wishlist();
      wishlist.id = id;
      updateWishlistDto.name && (wishlist.name = updateWishlistDto.name);
      updateWishlistDto.image && (wishlist.image = updateWishlistDto.image);
      updateWishlistDto.itemsId &&
        (wishlist.items = (await this.wishesService.findAll()).filter((wish) =>
          updateWishlistDto.itemsId.includes(wish.id),
        ));
      return this.wishlistRepository.save(wishlist);
    } else {
      throw new ForbiddenException();
    }
  }

  async remove(id: number, req: RequestWithUser) {
    const wishlist = await this.findOne(id);
    if (req.user.id !== wishlist.owner.id) {
      throw new ForbiddenException();
    }
    return await this.wishlistRepository.remove(wishlist);
  }
}

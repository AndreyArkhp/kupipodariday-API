import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { RequestWithUser } from 'src/types';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';

@Controller('wishes')
@UseGuards(AuthGuard('jwt'))
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  create(@Body() createWishDto: CreateWishDto, @Req() req: RequestWithUser) {
    return this.wishesService.create(createWishDto, req);
  }

  @Get('last')
  findLast() {
    return this.wishesService.findLast();
  }

  @Get('top')
  findTop() {
    return this.wishesService.findTop();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(+id);
  }

  @Patch(':id')
  updateOne(@Param('id') id: string) {
    this.wishesService.updateOne(+id);
  }

  @Get()
  findAll() {
    return this.wishesService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishesService.remove(+id);
  }

  @Post(':id/copy')
  async copy(@Param('id') id: string, @Req() requestWithUser: RequestWithUser) {
    return this.wishesService.copyWish(+id, requestWithUser);
  }
}

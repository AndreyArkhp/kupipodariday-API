import { IsString, Length, IsUrl, IsNumber } from 'class-validator';
import { wishlistNameLength } from '../../common/constants';

export class CreateWishlistDto {
  @IsString()
  @Length(wishlistNameLength.min, wishlistNameLength.max)
  name: string;
  @IsUrl()
  image: string;
  @IsNumber({}, { each: true })
  itemsId: number[];
}

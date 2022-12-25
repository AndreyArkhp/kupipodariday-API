import {
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
  Length,
  Min,
} from 'class-validator';
import {
  wishDescriptionLength,
  wishNameLength,
  wishNumberLimitMessage,
} from 'src/common/constants';

export class CreateWishDto {
  @Length(wishNameLength.min, wishNameLength.max)
  @IsString()
  name: string;
  @IsUrl()
  link: string;
  @IsUrl()
  image: string;
  @IsNumber(
    { maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false },
    {
      message: wishNumberLimitMessage,
    },
  )
  @IsPositive()
  @Min(0)
  price: number;
  @IsString()
  @Length(wishDescriptionLength.min, wishDescriptionLength.max)
  description: string;
}

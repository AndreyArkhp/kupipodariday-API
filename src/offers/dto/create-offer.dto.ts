import { IsNumber, IsPositive, IsBoolean } from 'class-validator';
import { numberLimitMessageForHundredths } from '../../common/constants';

export class CreateOfferDto {
  @IsNumber(
    { maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false },
    { message: numberLimitMessageForHundredths },
  )
  @IsPositive()
  amount: number;
  @IsBoolean()
  hidden: boolean;
  @IsNumber()
  @IsPositive()
  itemId: number;
}

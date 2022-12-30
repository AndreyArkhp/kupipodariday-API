import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  IsNumber,
} from 'class-validator';
import { userAboutLength, usernameLength } from 'src/common/constants';

export class ResponseUserDto {
  @IsNumber()
  id: number;
  @IsString()
  @Length(usernameLength.min, usernameLength.max)
  username: string;
  @IsString()
  @Length(userAboutLength.min, userAboutLength.max)
  about?: string;
  @IsOptional()
  @IsUrl()
  avatar?: string;
  @IsEmail()
  email: string;
}

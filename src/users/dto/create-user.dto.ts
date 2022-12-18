import { IsString, Length, IsUrl, IsEmail, IsOptional } from 'class-validator';
import {
  userAboutLength,
  usernameLength,
  userPasswirdLengthMin,
} from '../../common/constants';

export class CreateUserDto {
  @IsString()
  @Length(usernameLength.min, usernameLength.max)
  username: string;
  @IsOptional()
  @IsString()
  @Length(userAboutLength.min, userAboutLength.max)
  about?: string;
  @IsOptional()
  @IsUrl()
  avatar?: string;
  @IsEmail()
  email: string;
  @IsString()
  @Length(userPasswirdLengthMin)
  password: string;
}

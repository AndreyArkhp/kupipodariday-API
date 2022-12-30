import { IsString, Length, IsUrl, IsEmail, IsOptional } from 'class-validator';
import {
  userAboutLength,
  usernameLength,
  userPasswordLengthMin,
} from '../../common/constants';

export class CreateUserDto {
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
  @IsString()
  @Length(userPasswordLengthMin)
  password: string;
}

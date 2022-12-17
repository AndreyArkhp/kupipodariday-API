import { IsString, Length, IsUrl, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 30)
  username: string;
  @IsOptional()
  @IsString()
  @Length(2, 200)
  about?: string;
  @IsOptional()
  @IsUrl()
  avatar?: string;
  @IsEmail()
  email: string;
  @IsString()
  @Length(2)
  password: string;
}

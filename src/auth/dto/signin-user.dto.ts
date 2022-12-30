import { IsString, Length } from 'class-validator';
import { usernameLength, userPasswordLengthMin } from 'src/common/constants';

export class SigninDto {
  @IsString()
  @Length(usernameLength.min, usernameLength.max)
  username: string;
  @IsString()
  @Length(userPasswordLengthMin)
  password: string;
}

import { IsString, Length } from 'class-validator';
import { usernameLength } from 'src/common/constants';

export class FindUsersDto {
  @IsString()
  @Length(usernameLength.min, usernameLength.max)
  query: string;
}

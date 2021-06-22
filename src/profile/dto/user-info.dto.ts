import { IsString } from 'class-validator';

export class UserInfoDto {
  @IsString()
  name: string;
  @IsString()
  about?: string;
}

import { IsString } from 'class-validator';

export class updateUserDto {
  @IsString()
  email?: string;

  @IsString()
  name?: string;
}

import { IsString } from 'class-validator';

export class createUserDto {
  @IsString()
  email: string;

  @IsString()
  name: string;
}

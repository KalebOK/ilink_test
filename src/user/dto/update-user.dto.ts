import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class updateUserDto {
  @ApiProperty({
    name: `User Email`,
    type: String,
    example: `user@mail.com`,
  })
  @IsString()
  email?: string;

  @ApiProperty({
    name: `User Name`,
    type: String,
    example: `Roman Gurev`,
  })
  @IsString()
  name?: string;
}

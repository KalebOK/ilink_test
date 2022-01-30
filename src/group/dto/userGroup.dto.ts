import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class userGroupDto {
  @ApiProperty({
    name: 'User ID',
    type: Number,
  })
  @IsNumber()
  userId: number;
}

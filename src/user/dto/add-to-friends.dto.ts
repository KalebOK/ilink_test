import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class addToFriendsDto {
  @ApiProperty({
    description: 'ID пользовтаеля, которому нужно добавить друга',
    type: Number,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'ID пользователя, который должен стать другом',
    type: Number,
  })
  @IsNumber()
  friendId: number;
}

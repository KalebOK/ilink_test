import { IsNumber } from 'class-validator';

export class addToFriendsDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  friendId: number;
}

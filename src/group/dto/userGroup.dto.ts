import { IsNumber } from 'class-validator';

export class userGroupDto {
  @IsNumber()
  userId: number;
}

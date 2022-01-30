import { IsString } from 'class-validator';

export class GroupDto {
  @IsString()
  name: string;
}

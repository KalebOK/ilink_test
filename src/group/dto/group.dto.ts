import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GroupDto {
  @ApiProperty({
    description: 'Имя создаваемой группы',
    type: String,
  })
  @IsString()
  name: string;
}

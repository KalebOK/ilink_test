import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupDto } from './dto/group.dto';
import { userGroupDto } from './dto/userGroup.dto';
import { validate } from 'class-validator';
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  @UsePipes(new ValidationPipe())
  @Post()
  async createGroup(@Body() dto: GroupDto) {
    return this.groupService.createGroup(dto);
  }

  @Get()
  async getAllGroups() {
    return this.groupService.getGroups();
  }

  @Get(':id')
  async getGroupById(@Param() id: number) {
    return this.groupService.getGroup(id);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async updateGroup(@Param() id: number, @Body() dto: GroupDto) {
    return this.groupService.updateGroup(id, dto);
  }

  @Delete(':id')
  async deleteGroupById(@Param() id: number) {
    return this.groupService.deleteGroupById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post(':id')
  async addToGroup(@Param() id: number, @Body() dto: userGroupDto) {
    return this.groupService.addToGroup(id, dto.userId);
  }

  @UsePipes(new ValidationPipe())
  @Post(':id/removeUser')
  async removeUserFromGroup(@Param() id: number, @Body() dto: userGroupDto) {
    return this.groupService.removeFromGroup(id, dto.userId);
  }
}

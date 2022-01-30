import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { addToFriendsDto } from './dto/add-to-friends.dto';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  async createUser(@Body() dto: createUserDto) {
    return this.userService.createUser(dto);
  }

  @Get()
  async getAllUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param() id: number) {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  async updateUserById(@Param() id: number, @Body() dto: updateUserDto) {
    return this.userService.updateUser(id, dto);
  }

  @HttpCode(200)
  @Delete('/:id')
  async removeUser(@Param() id: number) {
    return this.userService.deleteUser(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('friends')
  async addToFriends(@Body() dto: addToFriendsDto) {
    return this.userService.addFriend(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('friends/remove')
  async removeFromFriends(@Body() dto: addToFriendsDto) {
    return this.userService.removeFromFriends(dto);
  }
}

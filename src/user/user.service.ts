import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { addToFriendsDto } from './dto/add-to-friends.dto';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createUser(dto: createUserDto) {
    const existUser = await this.userRepo.findOne({
      where: { email: dto.email },
    });
    if (existUser) {
      throw new BadRequestException(`User ${dto.email} already exist`);
    }
    const user = await this.userRepo.create({
      email: dto.email,
      name: dto.name,
      friends: [],
      groups: [],
    });
    return await this.userRepo.save(user);
  }

  async getUsers() {
    return await this.userRepo.find({ relations: ['friends', 'groups'] });
  }

  async getUserById(id: number) {
    const user = await this.userRepo.findOne(id, {
      relations: ['friends', 'groups'],
    });
    if (!user) {
      throw new NotFoundException(`User: ${id} not found`);
    }
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException(`User: ${id} doesn't exist`);
    }
    await this.userRepo.remove(user);
    return true;
  }

  async updateUser(id: number, dto: updateUserDto) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User: ${id} not found`);
    }
    return await this.userRepo.update(user.id, dto);
  }

  async addFriend(dto: addToFriendsDto) {
    if (dto.userId === dto.friendId) {
      throw new BadRequestException(`his name is robert paulson`);
    }
    const user = await this.getUserById(dto.userId);
    console.log(user);
    const friend = await this.getUserById(dto.friendId);
    const friends = user.friends.find((i) => i.id === friend.id);
    if (friends) {
      throw new BadRequestException(
        `Users ${user.email} and ${friend.email} already friends`,
      );
    }
    user.friends.push(friend);
    return await this.userRepo.save(user);
  }

  async removeFromFriends(dto: addToFriendsDto) {
    console.log(dto);
    const user = await this.getUserById(dto.userId);
    const friend = await this.getUserById(dto.friendId);
    const userFriend = user.friends.find((i) => i.id === friend.id);
    if (!userFriend) {
      throw new BadRequestException(
        `Users ${user.email} and ${friend.email} not a friends`,
      );
    }
    const userFriendIndex = user.friends.findIndex((i) => i.id === friend.id);
    user.friends.splice(userFriendIndex, 1);
    this.userRepo.save(user);
    return user;
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';
import { GroupDto } from './dto/group.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private groupRepo: Repository<Group>,
    private readonly userService: UserService,
  ) {}
  async createGroup(dto: GroupDto) {
    const group = await this.groupRepo.create({
      name: dto.name,
      users: [],
    });
    return await this.groupRepo.save(group);
  }

  async getGroups() {
    const group = await this.groupRepo.find({ relations: ['users'] });
    return group;
  }

  async getGroup(id: number) {
    const group = await this.groupRepo.findOne(id, { relations: ['users'] });
    if (!group) {
      throw new NotFoundException(`Group with id: ${id} doesn't exist`);
    }
    return group;
  }

  async addToGroup(id: number, userId: number) {
    const group = await this.getGroup(id);
    console.log(userId);
    const user = await this.userService.getUserById(userId);
    const userInGroup = group.users.find((i) => i.id === user.id);
    if (userInGroup) {
      throw new BadRequestException(
        `${userInGroup.email} is already in ${group.name}`,
      );
    }
    group.users.push(user);
    return await this.groupRepo.save(group);
  }

  async removeFromGroup(id: number, userId: number) {
    const group = await this.getGroup(id);
    const user = await this.userService.getUserById(userId);
    console.log(user);
    const userInGroup = group.users.find((i) => i.id === user.id);
    if (!userInGroup) {
      throw new BadRequestException(`${user.email} not in ${group.name}`);
    }
    const userIndex = group.users.findIndex((i) => i.id === user.id);
    group.users.splice(userIndex, 1);
    return await this.groupRepo.save(group);
  }

  async updateGroup(id: number, dto: GroupDto) {
    const group = await this.getGroup(id);
    group.name = dto.name;
    return await this.groupRepo.save(group);
  }

  async deleteGroupById(id: number) {
    const group = await this.getGroup(id);
    return await this.groupRepo.softRemove(group);
  }
}

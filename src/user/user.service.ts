import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateUser } from './interfaces/create-user.interface';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async createUser(dto: ICreateUser) {
    const user = await this.userRepo.create(dto);
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email: email } });
    return user;
  }
}

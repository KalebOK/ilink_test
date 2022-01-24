import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcryptjs';
import { ICreateUser } from 'src/user/interfaces/create-user.interface';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async register(dto: ICreateUser) {
    const newUser = await this.userService.findByEmail(dto.email);
    if (newUser) {
      throw new BadRequestException(`User ${dto.email} already registered `);
    }
    const salt = await genSalt(10);
    const hashPassword = await hash(dto.password, salt);
    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}

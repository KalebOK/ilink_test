import { Body, Controller, Post } from '@nestjs/common';
import { ICreateUser } from 'src/user/interfaces/create-user.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: ICreateUser) {}

  @Post('login')
  async login(@Body() { email, password }: ICreateUser) {}
}

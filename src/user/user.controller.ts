import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Post('/signup')
  async signup(@Body() body: CreateUserDto): Promise<User> {
    return this.authService.signup(body.name, body.email, body.password);
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }
}

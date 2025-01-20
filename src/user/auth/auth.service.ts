import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    public userService: UserService,
    public userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(name: string, email: string, password: string) {
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Already Have User with this Email !');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const hashedPassword = salt + '.' + hash.toString('hex');
    return this.userService
      .createUser(name, email, hashedPassword)
      .catch((e) => {
        throw e;
      });
  }

  async login(email: string, password: string) {
    const existingUser = await this.userRepository
      .getUserByEmail(email)
      .catch((e) => {
        throw e;
      });
    if (!existingUser) {
      throw new NotFoundException('No User with with this Email !');
    }
    const [salt, hashedPassword] = existingUser.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (hash.toString('hex') !== hashedPassword) {
      throw new BadRequestException('Invalid Credentials');
    }
    const payload = {
      userId: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '1h',
      }),
    };
  }
  async validateUserByEmail(email: string) {
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (!existingUser) {
      console.log('ssssssss');
      throw new UnauthorizedException('Invalid Token');
    }
    return true
  }
}

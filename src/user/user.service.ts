import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(public userRepository: UserRepository) {}

  async createUser(name: string, email: string) {
    const existingUser = await this.userRepository.getUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Already Have User with this Email !');
    }
    return this.userRepository.createUser(name, email);
  }

  getUsers() {
    return this.userRepository.getUsers();
  }
}

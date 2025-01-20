import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(public userRepository: UserRepository) {}

  async createUser(name: string, email: string, password: string) {
    return this.userRepository.createUser(name, email, password);
  }

  getUsers() {
    return this.userRepository.getUsers();
  }
}

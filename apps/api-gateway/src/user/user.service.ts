import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateUserDto,
  UpdateUserDto,
  UserPatterns,
} from '@nest-next-auth-microservices/contracts';
import { USER_SERVICE_NAME } from './constant';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_SERVICE_NAME) private readonly userClient: ClientProxy,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userClient.send(UserPatterns.CREATE_USER, createUserDto);
  }

  findAll() {
    return this.userClient.send('findAllUser', {});
  }

  findOne(id: number) {
    return this.userClient.send('findOneUser', id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userClient.send('updateUser', { ...updateUserDto, id });
  }

  remove(id: number) {
    return this.userClient.send('removeUser', id);
  }
}

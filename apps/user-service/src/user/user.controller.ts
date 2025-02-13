import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UserPatterns,
} from '@nest-next-auth-microservices/contracts';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserPatterns.CREATE_USER)
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern(UserPatterns.FIND_ALL_USER)
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern(UserPatterns.GET_USER)
  findOne(@Payload() id: number) {
    return this.userService.findOne(id);
  }

  @MessagePattern(UserPatterns.UPDATE_USER)
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern(UserPatterns.DELETE_USER)
  remove(@Payload() id: number) {
    return this.userService.remove(id);
  }
}

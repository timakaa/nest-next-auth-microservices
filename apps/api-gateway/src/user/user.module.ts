import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  USER_SERVICE_HOST,
  USER_SERVICE_PORT,
} from '@nest-next-auth-microservices/config';
import { USER_SERVICE_NAME } from './constant';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: USER_SERVICE_NAME,
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: USER_SERVICE_HOST,
            port: USER_SERVICE_PORT,
          },
        }),
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

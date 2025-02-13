import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import {
  USER_SERVICE_HOST,
  USER_SERVICE_PORT,
} from '@nest-next-auth-microservices/config';
import { Catch } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch()
class GlobalExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: any): Observable<any> {
    return throwError(
      () => new RpcException(exception?.message || 'Internal error'),
    );
  }
}

async function bootstrap() {
  console.log(USER_SERVICE_HOST, USER_SERVICE_PORT);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: USER_SERVICE_HOST,
        port: USER_SERVICE_PORT,
      },
    },
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen();
}
bootstrap();

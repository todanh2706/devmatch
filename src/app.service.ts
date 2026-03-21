import { Injectable } from '@nestjs/common';

@Injectable() // The Decorator for DI
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

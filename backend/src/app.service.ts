import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Ồ! lại chào các bạn mình là Thiện :)))';
  }
}

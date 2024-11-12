import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TransactionsService {
  constructor(private userService: UsersService) {}

  async create(userId: string, giftId: string) {
    await this.userService.createGift(userId, giftId);
  }
}

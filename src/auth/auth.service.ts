import { Injectable, UnauthorizedException } from '@nestjs/common';
import { parse, validate, type InitData } from '@telegram-apps/init-data-node';

@Injectable()
export class AuthService {
  private readonly token = '7632034749:AAGbVUeE9w52iXQ7sekBEB2Lk4kB8alpuVM';

  getInitData(initData: InitData | undefined): InitData {
    if (!initData) {
      throw new UnauthorizedException('Init data not found or unauthorized');
    }
    return initData;
  }

  validateInitData(authData: string): InitData {
    try {
      validate(authData, this.token, {
        expiresIn: 0,
      });
      return parse(authData);
    } catch {
      throw new UnauthorizedException('Invalid init data');
    }
  }
}

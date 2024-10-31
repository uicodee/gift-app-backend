import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TelegramAuth implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authData = request.header('authorization') || '';
    const initData = this.authService.validateInitData(authData);
    let user = await this.userService.findOneByTelegramId(initData.user.id);
    if (!user) {
      const language = ['ru', 'en'].includes(initData.user.languageCode)
        ? initData.user.languageCode
        : 'en';
      user = await this.userService.create({
        telegramId: initData.user.id,
        fullName: `${initData.user.firstName} ${initData.user.lastName}`,
        username: initData.user.username,
        language: language,
      });
    }
    request.user = user;
    request.initData = initData;
    return true;
  }
}

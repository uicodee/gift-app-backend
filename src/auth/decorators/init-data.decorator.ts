import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TelegramData = createParamDecorator(
  (_data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getResponse();
    return request.locals.initData;
  },
);

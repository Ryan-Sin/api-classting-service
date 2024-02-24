import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const response = ctx.switchToHttp().getResponse();
  const user = response.locals.user;
  return data && data.length > 0 ? user?.[data] : user;
});

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtTokenService } from "../../service/jwt-token.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtTokenService: JwtTokenService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const authorization = request.headers['authorization'];
    if (!authorization) {
      throw new UnauthorizedException('invalid token');
    }
    const jwtToken = authorization.split('Bearer ')[1];
    const decodeJwtToken = await this.jwtTokenService.verifyToken(jwtToken);
    if (!decodeJwtToken) {
      throw new UnauthorizedException('invalid token');
      return false;
    }

    delete decodeJwtToken.iat;
    delete decodeJwtToken.exp;
    response.locals.user = decodeJwtToken;
    response.locals.user.token = jwtToken;
    return true;
  }
}
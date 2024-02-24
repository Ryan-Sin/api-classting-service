import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger: Logger;

  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });

    this.logger = new Logger("Authentication");
  }

  /**
   * @author Ryan
   * @description 클라이언트가 전송한 Jwt 토큰 정보
   *
   * @param payload 토큰 전송 내용
   */
  async validate(payload) {
    this.logger.log(
      `접속 클라이언트 정보: [Authorization Data] 유저정보: ${JSON.stringify(
        payload
      )}`
    );

    return payload;
  }
}

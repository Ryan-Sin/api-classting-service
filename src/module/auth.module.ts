import { Module } from '@nestjs/common';
import {MysqlModule} from "../databases/mysql.module";
import { AuthController } from '../controller/auth.controller';
import { AuthService } from '../service/auth.service';
import { JwtTokenService } from "../service/jwt-token.service";
import { CrewRepository } from "../repository/crew.repository";
import { StudentRepository } from "../repository/student.repository";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SchoolRepository } from "../repository/school.repository";

@Module({
  imports: [
    MysqlModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: configService.get<string>(
            "ACCESS_TOKEN_VALIDITY_IN_SECONDS"
          )
        }
      })
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtTokenService,
    SchoolRepository,
    CrewRepository,
    StudentRepository
  ],
})
export class AuthModule {}

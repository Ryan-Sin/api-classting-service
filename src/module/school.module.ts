import { Module } from '@nestjs/common';
import { MysqlModule } from "../databases/mysql.module";
import { SchoolController } from '../controller/school.controller';
import { SchoolService } from '../service/school.service';
import { CrewRepository } from "../repository/crew.repository";
import { SchoolRepository } from "../repository/school.repository";
import { SchoolPageRepository } from "../repository/school-page.repository";
import { JwtModule } from "@nestjs/jwt";
import { JwtTokenService } from "../service/jwt-token.service";

@Module({
  imports: [MysqlModule, JwtModule],
  controllers: [SchoolController],
  providers: [
    JwtTokenService,
    SchoolService,
    CrewRepository,
    SchoolRepository,
    SchoolPageRepository
  ],
})
export class SchoolModule {}

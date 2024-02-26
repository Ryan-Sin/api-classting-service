import { Module } from '@nestjs/common';
import { StudentController } from '../controller/student.controller';
import { StudentService } from '../service/student.service';
import { MysqlModule } from "../databases/mysql.module";
import { StudentRepository } from "../repository/student.repository";
import { SchoolRepository } from "../repository/school.repository";
import { SchoolPageRepository } from "../repository/school-page.repository";
import { JwtTokenService } from "../service/jwt-token.service";
import { JwtModule } from "@nestjs/jwt";
import { SubscriptionRepository } from "../repository/subscription.repository";
import { SchoolNewsRepository } from "../repository/school-news.repository";

@Module({
  imports: [MysqlModule, JwtModule],
  controllers: [StudentController],
  providers: [
    JwtTokenService,
    StudentService,
    StudentRepository,
    SchoolRepository,
    SchoolPageRepository,
    SubscriptionRepository,
    SchoolNewsRepository
  ],
})
export class StudentModule {}

import { Module } from '@nestjs/common';
import { NewsFeedController } from '../controller/news-feed.controller';
import { NewsFeedService } from '../service/news-feed.service';
import { MysqlModule } from "../databases/mysql.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtTokenService } from "../service/jwt-token.service";
import { CrewRepository } from "../repository/crew.repository";
import { SchoolNewsRepository } from "../repository/school-news.repository";
import { SchoolRepository } from "../repository/school.repository";
import { SchoolPageRepository } from "../repository/school-page.repository";

@Module({
  imports: [MysqlModule, JwtModule],
  controllers: [NewsFeedController],
  providers: [
    NewsFeedService,
    JwtTokenService,
    CrewRepository,
    SchoolRepository,
    SchoolPageRepository,
    SchoolNewsRepository
  ],
})
export class NewsFeedModule {}

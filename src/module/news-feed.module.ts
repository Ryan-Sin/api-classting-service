import { Module } from '@nestjs/common';
import { NewsFeedController } from '../controller/news-feed.controller';
import { NewsFeedService } from '../service/news-feed.service';

@Module({
  imports: [],
  controllers: [NewsFeedController],
  providers: [NewsFeedService],
})
export class NewsFeedModule {}

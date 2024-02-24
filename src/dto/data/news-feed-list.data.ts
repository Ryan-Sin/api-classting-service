import { IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NewsFeedData } from './news-feed.data';

export class NewsFeedListData {
  @ApiProperty({
    description: '전체 수',
    required: true,
  })
  @IsNumber()
  totalCount: number;

  @ApiProperty({
    description: '',
    required: true,
    example: [new NewsFeedData()],
  })
  @IsArray()
  list: NewsFeedData[] = [new NewsFeedData()];
}

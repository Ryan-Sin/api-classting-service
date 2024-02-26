import { IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { NewsFeedData } from './news-feed.data';
import { Expose, Type } from "class-transformer";

export class NewsFeedListData {
  @ApiProperty({
    description: '전체 수',
    required: true,
  })
  @Expose()
  @IsNumber()
  totalCount: number;

  @ApiProperty({
    description: '',
    required: true,
    example: [new NewsFeedData()],
  })
  @Expose()
  @Type(() => NewsFeedData)
  @IsArray()
  list: NewsFeedData[];
}

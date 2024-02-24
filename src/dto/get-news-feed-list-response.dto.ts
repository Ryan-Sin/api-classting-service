import { IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseData } from './data/common-response.data';
import { NewsFeedListData } from './data/news-feed-list.data';

export class GetNewsFeedListResponseDto {
  @ApiProperty({
    description: '',
    required: true,
    example: new CommonResponseData(),
  })
  @IsObject()
  common: CommonResponseData = new CommonResponseData();

  @ApiProperty({
    description: '',
    required: true,
    example: new NewsFeedListData(),
  })
  @IsObject()
  data: NewsFeedListData = new NewsFeedListData();
}

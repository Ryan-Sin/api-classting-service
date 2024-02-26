import { IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseData } from './data/common-response.data';
import { SchoolPageListData } from './data/school-page-list.data';

export class GetSubscriptionSchoolNewsFeedListResponseDto {
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
    example: new SchoolPageListData(),
  })
  @IsObject()
  data: SchoolPageListData;
}

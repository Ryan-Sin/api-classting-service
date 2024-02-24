import { IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseData } from './data/common-response.data';

export class CreateNewsFeedResponseDto {
  @ApiProperty({
    description: '',
    required: true,
    example: new CommonResponseData(),
  })
  @IsObject()
  common: CommonResponseData = new CommonResponseData();
}

import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetSubscriptionSchoolNewsFeedListRequestDto {
  @ApiProperty({
    description: '조회하려는 목록의 시작 위치. 0:첫번째 목록부터',
    required: true,
  })
  @IsNumber()
  offset: number;

  @ApiProperty({
    description: '조회하려는 목록의 길이. 10:10개의 목록을 리턴',
    required: true,
  })
  @IsNumber()
  limit: number;
}

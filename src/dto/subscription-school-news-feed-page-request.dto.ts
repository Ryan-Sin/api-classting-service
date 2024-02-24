import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionSchoolNewsFeedPageRequestDto {
  @ApiProperty({
    description: '학교 지역',
    required: true,
  })
  @IsString()
  schoolRegion: string;

  @ApiProperty({
    description: '학교 이름',
    required: true,
  })
  @IsString()
  schoolName: string;

  @ApiProperty({
    description: '학교 페이지 이름',
    required: true,
  })
  @IsString()
  pageName: string;
}

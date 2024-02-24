import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NewsFeedData {
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
    description: '소식 제목',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: '소식 내용',
    required: true,
  })
  @IsString()
  content: string;
}

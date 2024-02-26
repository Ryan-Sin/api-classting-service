import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from "class-transformer";

export class NewsFeedData {
  @ApiProperty({
    description: '학교 지역',
    required: true,
  })
  @Expose()
  @IsString()
  schoolRegion: string;

  @ApiProperty({
    description: '학교 이름',
    required: true,
  })
  @Expose()
  @IsString()
  schoolName: string;

  @ApiProperty({
    description: '소식 제목',
    required: true,
  })
  @Expose()
  @IsString()
  title: string;

  @ApiProperty({
    description: '소식 내용',
    required: true,
  })
  @Expose()
  @IsString()
  content: string;
}

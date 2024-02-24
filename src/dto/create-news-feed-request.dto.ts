import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsFeedRequestDto {
  @ApiProperty({
    description: '학교 페이지 이름',
    required: true,
  })
  @IsString()
  pageName: string;

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

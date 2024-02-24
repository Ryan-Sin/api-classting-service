import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from "class-transformer";

export class SchoolPageData {
  @ApiProperty({
    description: '학교 지역',
    required: true,
  })
  @Expose()
  @Transform(({obj}) => obj.__school__.region)
  @IsString()
  schoolRegion: string;

  @ApiProperty({
    description: '학교 이름',
    required: true,
  })
  @Expose()
  @Transform(({obj}) => obj.__school__.name)
  @IsString()
  schoolName: string;

  @ApiProperty({
    description: '학교 페이지 이름',
    required: true,
  })
  @Expose()
  @Transform(({obj}) => obj.name)
  @IsString()
  pageName: string;
}

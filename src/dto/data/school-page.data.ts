import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from "class-transformer";

export class SchoolPageData {
  @ApiProperty({
    description: '학교 지역',
    required: true,
  })
  @Expose()
  @Transform(({obj}) => obj.school?.region || obj.schoolPage.school.region)
  @IsString()
  schoolRegion: string;

  @ApiProperty({
    description: '학교 이름',
    required: true,
  })
  @Expose()
  @Transform(({obj}) => obj.school?.name ||obj.schoolPage.school.name )
  @IsString()
  schoolName: string;

  @ApiProperty({
    description: '학교 페이지 이름',
    required: true,
  })
  @Expose()
  @Transform(({obj}) => obj?.name ||  obj.schoolPage.name)
  @IsString()
  pageName: string;
}

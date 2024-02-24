import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Type } from "class-transformer";

export class GetSchoolPageListRequestDto {
  @ApiProperty({
    description: '학교 지역',
    required: true,
  })
  @IsString()
  schoolRegion: string

  @ApiProperty({
    description: '학교이름',
    required: true,
  })
  @IsString()
  schoolName: string;

  @ApiProperty({
    description: '조회하려는 목록의 시작 위치. 0:첫번째 목록부터',
    required: true,
  })
  @Type(() => Number)
  @IsNumber()
  offset: number;

  @ApiProperty({
    description: '조회하려는 목록의 길이. 10:10개의 목록을 리턴',
    required: true,
  })
  @Type(() => Number)
  @IsNumber()
  limit: number;
}

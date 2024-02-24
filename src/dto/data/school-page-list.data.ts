import { IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SchoolPageData } from './school-page.data';
import { Expose, Type } from "class-transformer";

export class SchoolPageListData {
  @ApiProperty({
    description: '전체 수',
    required: true,
  })
  @Expose()
  @IsNumber()
  totalCount: number;

  @ApiProperty({
    description: '',
    required: true,
    example: [new SchoolPageData()],
  })
  @Expose()
  @Type(() => SchoolPageData)
  @IsArray()
  list: SchoolPageData[];
}

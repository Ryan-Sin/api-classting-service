import { IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SchoolPageData } from './school-page.data';

export class SchoolPageListData {
  @ApiProperty({
    description: '전체 수',
    required: true,
  })
  @IsNumber()
  totalCount: number;

  @ApiProperty({
    description: '',
    required: true,
    example: [new SchoolPageData()],
  })
  @IsArray()
  list: SchoolPageData[] = [new SchoolPageData()];
}

import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSchoolPageRequestDto {
  @ApiProperty({
    description: '페이지 이름',
    required: true,
  })
  @IsString()
  pageName: string;
}

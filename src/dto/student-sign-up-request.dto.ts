import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StudentSignUpRequestDto {
  @ApiProperty({
    description: '이메일',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: '비밀번호',
    required: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: '학교 지역',
    required: true,
  })
  @IsString()
  schoolRegion: string;

  @ApiProperty({
    description: '학교 이름',
    required: false,
  })
  @IsOptional()
  @IsString()
  schoolName?: string;
}
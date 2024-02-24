import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInRequestDto {
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
    description: '관리자 || 학생',
    required: true,
  })
  @IsString()
  type: string;
}

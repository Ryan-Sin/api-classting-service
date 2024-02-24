import { IsEnum, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { LEVEL } from "../utils/enum";

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
    description: 'ADMIN || STUDENT',
    required: true,
  })
  @IsEnum(LEVEL)
  type: LEVEL;
}

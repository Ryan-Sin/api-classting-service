import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseTokenData {
  @ApiProperty({
    description: '엑세스 토큰 정보',
    required: true,
  })
  @IsString()
  accessToken: string;
}

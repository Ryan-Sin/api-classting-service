import { IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseData } from './data/common-response.data';
import { ResponseTokenData } from './data/response-token.data';

export class SignInResponseDto {
  @ApiProperty({
    description: '',
    required: true,
    example: new CommonResponseData(),
  })
  @IsObject()
  common: CommonResponseData = new CommonResponseData();

  @ApiProperty({
    description: '',
    required: true,
    example: new ResponseTokenData(),
  })
  @IsObject()
  data: ResponseTokenData = new ResponseTokenData();
}

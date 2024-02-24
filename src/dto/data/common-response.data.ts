import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import * as dayjs from "dayjs";

export class CommonResponseData {
  @ApiProperty({
    description:
      '서버에서 응답을 생성한 unix time string(클라이언트에서 캐싱 처리에 참조할 수 있음)',
    required: true,
  })
  @IsString()
  createdAt: string = dayjs().format("YYYY-MM-DDTHH:mm:ss.SSSZ");

  @ApiProperty({
    description: '응답 성공 여부.success:성공, fail:실패, disaster:매우 실패',
    required: true,
    example: 'success',
  })
  @IsString()
  status: string = 'success';

  @ApiProperty({
    description:
      'status가 success 아닐때, 에러에 대한 설명이 포함된다. 이 내용은 사용자나 조작자에게 노출되어도 무방한 내용을 포함한다.',
    required: true,
  })
  @IsString()
  message: string;
}

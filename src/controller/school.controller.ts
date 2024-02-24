import {
  Controller,
  Req,
  Res,
  HttpStatus,
  Post,
  Body,
  Get,
} from '@nestjs/common';
import { SchoolService } from '../service/school.service';
import { Request, Response } from 'express';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateSchoolPageRequestDto } from '../dto/create-school-page-request.dto';
import { CreateSchoolPageResponseDto } from '../dto/create-school-page-response.dto';
import { GetSchoolPageListRequestDto } from '../dto/get-school-page-list-request.dto';
import { GetSchoolPageListResponseDto } from '../dto/get-school-page-list-response.dto';

@Controller('school')
@ApiTags('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @ApiOperation({
    summary: '학교 관리자 학교 페이지를 생성',
    description: '학교 관리자는 지역, 학교명으로 학교 페이지를 생성할 수 있다.',
  })
  @ApiResponse({
    description: '성공여부',
    type: CreateSchoolPageResponseDto,
  })
  @Post('/v1/page')
  async createSchoolPage(
    @Body() createSchoolPageRequestDto: CreateSchoolPageRequestDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.schoolService.createSchoolPage(createSchoolPageRequestDto, req);

    return res.status(HttpStatus.OK).json(new CreateSchoolPageResponseDto());
  }

  @ApiOperation({
    summary: '등록된 학교 페이지 조회',
    description: '등록한 학교 페이지 정보를 조회할 수 있다.',
  })
  @ApiResponse({
    description: '성공여부',
    type: GetSchoolPageListResponseDto,
  })
  @Get('/v1/page')
  async getSchoolPageList(
    @Body() getSchoolPageListRequestDto: GetSchoolPageListRequestDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.schoolService.getSchoolPageList(
      getSchoolPageListRequestDto,
      req,
    );

    return res.status(HttpStatus.OK).json(new GetSchoolPageListResponseDto());
  }
}

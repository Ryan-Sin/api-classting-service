import {
  Controller,
  Req,
  Res,
  HttpStatus,
  Post,
  Body,
  Get, UseGuards, Query
} from "@nestjs/common";
import { SchoolService } from "../service/school.service";
import { Request, Response } from "express";
import { ApiResponse, ApiOperation, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { CreateSchoolPageRequestDto } from "../dto/create-school-page-request.dto";
import { CreateSchoolPageResponseDto } from "../dto/create-school-page-response.dto";
import { GetSchoolPageListRequestDto } from "../dto/get-school-page-list-request.dto";
import { GetSchoolPageListResponseDto } from "../dto/get-school-page-list-response.dto";
import { JwtAuthGuard } from "../utils/guard/jwt-auth.guard";
import { User } from "../utils/decorator/user.decorator";
import { AdminInfo } from "../utils/role/user-info";

@Controller("school")
@ApiTags("school")
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {
  }

  @ApiOperation({
    summary: "학교 관리자 학교 페이지를 생성",
    description: "학교 관리자는 지역, 학교명으로 학교 페이지를 생성할 수 있다."
  })
  @ApiResponse({
    description: "성공여부",
    type: CreateSchoolPageResponseDto
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post("/v1/page")
  async createSchoolPage(
    @Body() body: CreateSchoolPageRequestDto,
    @User() admin: AdminInfo,
    @Res() res: Response
  ) {
    await this.schoolService.createSchoolPage(body, admin);

    return res.status(HttpStatus.OK).json(new CreateSchoolPageResponseDto());
  }

  @ApiOperation({
    summary: "등록된 학교 페이지 조회",
    description: "등록한 학교 페이지 정보를 조회할 수 있다."
  })
  @ApiResponse({
    description: "성공여부",
    type: GetSchoolPageListResponseDto
  })
  @Get("/v1/page")
  async getSchoolPageList(
    @Query() query: GetSchoolPageListRequestDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const data = await this.schoolService.getSchoolPageList(query, req);

    const response = new GetSchoolPageListResponseDto();
    response.data = data;

    return res.status(HttpStatus.OK).json(response);
  }
}

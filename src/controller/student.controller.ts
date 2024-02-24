import {
  Controller,
  Req,
  Res,
  HttpStatus,
  Post,
  Body,
  Get,
  Delete,
} from '@nestjs/common';
import { StudentService } from '../service/student.service';
import { Request, Response } from 'express';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubscriptionSchoolNewsFeedPageRequestDto } from '../dto/subscription-school-news-feed-page-request.dto';
import { SubscriptionSchoolNewsFeedPageResponseDto } from '../dto/subscription-school-news-feed-page-response.dto';
import { GetSubscriptionSchoolNewsFeedListRequestDto } from '../dto/get-subscription-school-news-feed-list-request.dto';
import { GetSubscriptionSchoolNewsFeedListResponseDto } from '../dto/get-subscription-school-news-feed-list-response.dto';
import { DeleteSubscriptionSchoolNewsFeedRequestDto } from '../dto/delete-subscription-school-news-feed-request.dto';
import { DeleteSubscriptionSchoolNewsFeedResponseDto } from '../dto/delete-subscription-school-news-feed-response.dto';
import { GetSubscriptionSchoolPageRequestDto } from '../dto/get-subscription-school-page-request.dto';
import { GetSubscriptionSchoolPageResponseDto } from '../dto/get-subscription-school-page-response.dto';
import { GetNewsFeedListRequestDto } from '../dto/get-news-feed-list-request.dto';
import { GetNewsFeedListResponseDto } from '../dto/get-news-feed-list-response.dto';

@Controller('student')
@ApiTags('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({
    summary: '학생 학교 페이지 구독',
    description: '학생은 학교 페이지를 구독할 수 있다.',
  })
  @ApiResponse({
    description: '성공여부',
    type: SubscriptionSchoolNewsFeedPageResponseDto,
  })
  @Post('/v1/sbuscription/school/page')
  async subscriptionSchoolPage(
    @Body()
    subscriptionSchoolNewsFeedPageRequestDto: SubscriptionSchoolNewsFeedPageRequestDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.studentService.subscriptionSchoolPage(
      subscriptionSchoolNewsFeedPageRequestDto,
      req,
    );

    return res
      .status(HttpStatus.OK)
      .json(new SubscriptionSchoolNewsFeedPageResponseDto());
  }

  @ApiOperation({
    summary: '학생 구독 중인 학교 페이지 목록 조회',
    description: '학생은 구독 중인 학교 페이지 목록을 확인할 수 있다.',
  })
  @ApiResponse({
    description: '성공여부',
    type: GetSubscriptionSchoolNewsFeedListResponseDto,
  })
  @Get('/v1/sbuscription/school/page')
  async getSubscriptionSchoolNewsFeedList(
    @Body()
    getSubscriptionSchoolNewsFeedListRequestDto: GetSubscriptionSchoolNewsFeedListRequestDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.studentService.getSubscriptionSchoolNewsFeedList(
      getSubscriptionSchoolNewsFeedListRequestDto,
      req,
    );

    return res
      .status(HttpStatus.OK)
      .json(new GetSubscriptionSchoolNewsFeedListResponseDto());
  }

  @ApiOperation({
    summary: '학생 구독 중인 학교 페이지 구독 취소',
    description: '학생은 구독 중인 페이지를 구독 취소할 수 있다.',
  })
  @ApiResponse({
    description: '성공여부',
    type: DeleteSubscriptionSchoolNewsFeedResponseDto,
  })
  @Delete('/v1/sbuscription/school/page')
  async deleteSubscriptionSchoolNewsFeed(
    @Body()
    deleteSubscriptionSchoolNewsFeedRequestDto: DeleteSubscriptionSchoolNewsFeedRequestDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.studentService.deleteSubscriptionSchoolNewsFeed(
      deleteSubscriptionSchoolNewsFeedRequestDto,
      req,
    );

    return res
      .status(HttpStatus.OK)
      .json(new DeleteSubscriptionSchoolNewsFeedResponseDto());
  }

  @ApiOperation({
    summary: '학생 구독중인 학교 페이지별 소식 조회',
    description: '학생은 구독중인 학교 페이지별 소식을 볼수 있다.(최신순)',
  })
  @ApiResponse({
    description: '성공여부',
    type: GetSubscriptionSchoolPageResponseDto,
  })
  @Get('/v1/sbuscription/school/page/news-feed')
  async getSubscriptionSchoolPage(
    @Body()
    getSubscriptionSchoolPageRequestDto: GetSubscriptionSchoolPageRequestDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.studentService.getSubscriptionSchoolPage(
      getSubscriptionSchoolPageRequestDto,
      req,
    );

    return res
      .status(HttpStatus.OK)
      .json(new GetSubscriptionSchoolPageResponseDto());
  }

  @ApiOperation({
    summary: '학생 뉴스피트 조회',
    description:
      '학생은 구독중인 학교 소식을 자신의 뉴스피드에서 모아볼 수 있다.',
  })
  @ApiResponse({
    description: '성공여부',
    type: GetNewsFeedListResponseDto,
  })
  @Get('/v1/news-feed')
  async getNewsFeedList(
    @Body() getNewsFeedListRequestDto: GetNewsFeedListRequestDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.studentService.getNewsFeedList(getNewsFeedListRequestDto, req);

    return res.status(HttpStatus.OK).json(new GetNewsFeedListResponseDto());
  }
}

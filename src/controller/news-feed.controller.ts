import {
  Controller,
  Req,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { NewsFeedService } from '../service/news-feed.service';
import { Request, Response } from 'express';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateNewsFeedRequestDto } from '../dto/create-news-feed-request.dto';
import { CreateNewsFeedResponseDto } from '../dto/create-news-feed-response.dto';
import { UpdateNewsFeedRequestDto } from '../dto/update-news-feed-request.dto';
import { UpdateNewsFeedResponseDto } from '../dto/update-news-feed-response.dto';
import { DeleteNewsFeedRequestDto } from '../dto/delete-news-feed-request.dto';
import { DeleteNewsFeedResponseDto } from '../dto/delete-news-feed-response.dto';

@Controller('school')
@ApiTags('school')
export class NewsFeedController {
  constructor(private readonly newsFeedService: NewsFeedService) {}

  @ApiOperation({
    summary: '학교 관리자 학교 소식 작성',
    description: '학교 관리자는 학교 페이지 내에 소식을 작성할 수 있다.',
  })
  @ApiResponse({
    description: '성공여부',
    type: CreateNewsFeedResponseDto,
  })
  @Post('/v1/page/news-feed')
  async createNewsFeed(
    @Body() createNewsFeedRequestDto: CreateNewsFeedRequestDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.newsFeedService.createNewsFeed(createNewsFeedRequestDto, req);

    return res.status(HttpStatus.OK).json(new CreateNewsFeedResponseDto());
  }

  @ApiOperation({
    summary: '학교 관리자 학교 소식 수정',
    description: '학교 관리자는 작성된 소식을 수정할 수 잇다.',
  })
  @ApiResponse({
    description: '성공여부',
    type: UpdateNewsFeedResponseDto,
  })
  @Put('/v1/page/news-feed')
  async updateNewsFeed(
    @Body() updateNewsFeedRequestDto: UpdateNewsFeedRequestDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.newsFeedService.updateNewsFeed(updateNewsFeedRequestDto, req);

    return res.status(HttpStatus.OK).json(new UpdateNewsFeedResponseDto());
  }

  @ApiOperation({
    summary: '학교 관리자 작성된 소식 삭제',
    description: '학교 관리자는 작성된 소식을 삭제할 수 있다.',
  })
  @ApiResponse({
    description: '성공여부',
    type: DeleteNewsFeedResponseDto,
  })
  @Delete('/v1/page/news-feed')
  async deleteNewsFeed(
    @Body() deleteNewsFeedRequestDto: DeleteNewsFeedRequestDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.newsFeedService.deleteNewsFeed(deleteNewsFeedRequestDto, req);

    return res.status(HttpStatus.OK).json(new DeleteNewsFeedResponseDto());
  }
}

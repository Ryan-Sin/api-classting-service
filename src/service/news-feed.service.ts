import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CommonError } from 'src/utils/common-exception';
import { ERROR_TYPE } from '../utils/enum';
import { ERROR_MESSAGE, STATUS_CODE } from '../utils/constant';
import { CreateNewsFeedRequestDto } from '../dto/create-news-feed-request.dto';
import { UpdateNewsFeedRequestDto } from '../dto/update-news-feed-request.dto';
import { DeleteNewsFeedRequestDto } from '../dto/delete-news-feed-request.dto';

@Injectable()
export class NewsFeedService {
  createNewsFeed(
    createNewsFeedRequestDto: CreateNewsFeedRequestDto,
    req: Request,
  ): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        resolve({});
      });
    } catch (e) {
      throw new CommonError(
        e.type || ERROR_TYPE.SYSTEM,
        e.status || STATUS_CODE.FAIL,
        e.status ? e.clientErrorMessage : ERROR_MESSAGE.SERVER_ERROR,
        e.message,
      );
    }
  }

  updateNewsFeed(
    updateNewsFeedRequestDto: UpdateNewsFeedRequestDto,
    req: Request,
  ): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        resolve({});
      });
    } catch (e) {
      throw new CommonError(
        e.type || ERROR_TYPE.SYSTEM,
        e.status || STATUS_CODE.FAIL,
        e.status ? e.clientErrorMessage : ERROR_MESSAGE.SERVER_ERROR,
        e.message,
      );
    }
  }

  deleteNewsFeed(
    deleteNewsFeedRequestDto: DeleteNewsFeedRequestDto,
    req: Request,
  ): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        resolve({});
      });
    } catch (e) {
      throw new CommonError(
        e.type || ERROR_TYPE.SYSTEM,
        e.status || STATUS_CODE.FAIL,
        e.status ? e.clientErrorMessage : ERROR_MESSAGE.SERVER_ERROR,
        e.message,
      );
    }
  }
}
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CommonError } from 'src/utils/exception/common-exception';
import { ERROR_TYPE } from '../utils/enum';
import { ERROR_MESSAGE, STATUS_CODE } from '../utils/constant';
import { SubscriptionSchoolNewsFeedPageRequestDto } from '../dto/subscription-school-news-feed-page-request.dto';
import { GetSubscriptionSchoolNewsFeedListRequestDto } from '../dto/get-subscription-school-news-feed-list-request.dto';
import { DeleteSubscriptionSchoolNewsFeedRequestDto } from '../dto/delete-subscription-school-news-feed-request.dto';
import { GetSubscriptionSchoolPageRequestDto } from '../dto/get-subscription-school-page-request.dto';
import { GetNewsFeedListRequestDto } from '../dto/get-news-feed-list-request.dto';

@Injectable()
export class StudentService {
  subscriptionSchoolPage(
    subscriptionSchoolNewsFeedPageRequestDto: SubscriptionSchoolNewsFeedPageRequestDto,
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

  getSubscriptionSchoolNewsFeedList(
    getSubscriptionSchoolNewsFeedListRequestDto: GetSubscriptionSchoolNewsFeedListRequestDto,
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

  deleteSubscriptionSchoolNewsFeed(
    deleteSubscriptionSchoolNewsFeedRequestDto: DeleteSubscriptionSchoolNewsFeedRequestDto,
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

  getSubscriptionSchoolPage(
    getSubscriptionSchoolPageRequestDto: GetSubscriptionSchoolPageRequestDto,
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

  getNewsFeedList(
    getNewsFeedListRequestDto: GetNewsFeedListRequestDto,
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

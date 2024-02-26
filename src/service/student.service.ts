import { Injectable } from "@nestjs/common";
import { CommonError } from "src/utils/exception/common-exception";
import { ERROR_TYPE } from "../utils/enum";
import { ERROR_MESSAGE, STATUS_CODE } from "../utils/constant";
import { SubscriptionSchoolNewsFeedPageRequestDto } from "../dto/subscription-school-news-feed-page-request.dto";
import { GetSubscriptionSchoolNewsFeedListRequestDto } from "../dto/get-subscription-school-news-feed-list-request.dto";
import { DeleteSubscriptionSchoolNewsFeedRequestDto } from "../dto/delete-subscription-school-news-feed-request.dto";
import { GetSubscriptionSchoolPageRequestDto } from "../dto/get-subscription-school-page-request.dto";
import { GetNewsFeedListRequestDto } from "../dto/get-news-feed-list-request.dto";
import { SchoolPageListData } from "../dto/data/school-page-list.data";
import { plainToInstance } from "class-transformer";
import { NewsFeedListData } from "../dto/data/news-feed-list.data";
import { StudentRepository } from "../repository/student.repository";
import { SchoolRepository } from "../repository/school.repository";
import { SchoolPageRepository } from "../repository/school-page.repository";
import { StudentInfo } from "../utils/role/user-info";
import { assertNotExistStudent } from "./validator/student-validator";
import { SchoolEntity } from "../entity/school.entity";
import { assertNotExistSchool } from "./validator/school-validator";
import { SchoolPageEntity } from "../entity/school-page.entity";
import { assertNotExistSchoolPage } from "./validator/school-page-validator";
import { SubscriptionRepository } from "../repository/subscription.repository";
import { StudentEntity } from "../entity/student.entity";
import * as dayjs from "dayjs";
import { SchoolNewsRepository } from "../repository/school-news.repository";
import { assertNotExistSubscriptionPage } from "./validator/subscription-validator";

@Injectable()
export class StudentService {

  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly schoolRepository: SchoolRepository,
    private readonly schoolPageRepository: SchoolPageRepository,
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly schoolNewsRepository: SchoolNewsRepository
  ) {
  }

  async subscriptionSchoolPage(
    body: SubscriptionSchoolNewsFeedPageRequestDto,
    student: StudentInfo
  ) {
    try {
      const { email } = student;
      const { schoolRegion, schoolName, pageName } = body;

      const studentEntity = await this.checkStudent(email);
      const schoolEntity = await this.checkSchool(schoolRegion, schoolName);
      const schoolPageEntity = await this.checkSchoolPage(schoolEntity, pageName);

      const now = dayjs();
      await this.subscriptionRepository.save(studentEntity.studentId, schoolPageEntity.schoolPageId, now);

    } catch (e) {
      throw new CommonError(
        e.type || ERROR_TYPE.SYSTEM,
        e.status || STATUS_CODE.FAIL,
        e.status ? e.clientErrorMessage : ERROR_MESSAGE.SERVER_ERROR,
        e.message
      );
    }
  }

  async getSubscriptionSchoolNewsFeedList(
    query: GetSubscriptionSchoolNewsFeedListRequestDto,
    student: StudentInfo
  ): Promise<SchoolPageListData> {
    try {
      const { email } = student;
      const { offset, limit } = query;

      const studentEntity = await this.checkStudent(email);
      const [list, totalCount] = await this.subscriptionRepository.findSchoolPageByStudentIdPagination(studentEntity.studentId, offset, limit);

      return plainToInstance(SchoolPageListData, {
        totalCount,
        list
      }, {
        excludeExtraneousValues: true
      });
    } catch (e) {
      throw new CommonError(
        e.type || ERROR_TYPE.SYSTEM,
        e.status || STATUS_CODE.FAIL,
        e.status ? e.clientErrorMessage : ERROR_MESSAGE.SERVER_ERROR,
        e.message
      );
    }
  }

  async deleteSubscriptionSchoolNewsFeed(
    query: DeleteSubscriptionSchoolNewsFeedRequestDto,
    student: StudentInfo
  ) {
    try {
      const { email } = student;
      const { schoolRegion, schoolName, pageName } = query;

      const studentEntity = await this.checkStudent(email);
      const schoolEntity = await this.checkSchool(schoolRegion, schoolName);
      const schoolPageEntity = await this.checkSchoolPage(schoolEntity, pageName);

      const subscriptionEntity = await this.subscriptionRepository.findOneByStudentIdAndSchoolPageId(studentEntity.studentId, schoolPageEntity.schoolPageId);
      const now = dayjs();
      subscriptionEntity.cancelSubscription(now);

      await this.subscriptionRepository.update(subscriptionEntity);
    } catch (e) {
      throw new CommonError(
        e.type || ERROR_TYPE.SYSTEM,
        e.status || STATUS_CODE.FAIL,
        e.status ? e.clientErrorMessage : ERROR_MESSAGE.SERVER_ERROR,
        e.message
      );
    }
  }

  async getSubscriptionSchoolPage(
    query: GetSubscriptionSchoolPageRequestDto,
    student: StudentInfo
  ): Promise<NewsFeedListData> {
    try {
      const { email } = student;
      const { schoolRegion, schoolName, pageName, offset, limit } = query;

      const studentEntity = await this.checkStudent(email);
      const schoolEntity = await this.checkSchool(schoolRegion, schoolName);
      const schoolPageEntity = await this.checkSchoolPage(schoolEntity, pageName);

      const subscriptionEntity = await this.subscriptionRepository.findOneByStudentIdAndSchoolPageId(studentEntity.studentId, schoolPageEntity.schoolPageId);
      assertNotExistSubscriptionPage(subscriptionEntity);

      const totalCount = await this.subscriptionRepository.findByStudentIdAndSchoolPageIdPaginationCount(studentEntity.studentId, schoolPageEntity.schoolPageId);
      const list = await this.subscriptionRepository.findByStudentIdAndSchoolPageIdPagination(studentEntity.studentId, schoolPageEntity.schoolPageId, offset, limit);

      return plainToInstance(NewsFeedListData, {
        totalCount,
        list
      }, {
        excludeExtraneousValues: true
      });
    } catch (e) {
      throw new CommonError(
        e.type || ERROR_TYPE.SYSTEM,
        e.status || STATUS_CODE.FAIL,
        e.status ? e.clientErrorMessage : ERROR_MESSAGE.SERVER_ERROR,
        e.message
      );
    }
  }

  async getNewsFeedList(
    query: GetNewsFeedListRequestDto,
    student: StudentInfo
  ): Promise<NewsFeedListData> {
    try {
      const { email } = student;
      const { offset, limit } = query;

      const studentEntity = await this.checkStudent(email);

      const totalCount = await this.subscriptionRepository.findByStudentIdPaginationCount(studentEntity.studentId);
      const list = await this.subscriptionRepository.findByStudentIdPagination(studentEntity.studentId, offset, limit);

      return plainToInstance(NewsFeedListData, {
        totalCount,
        list
      }, {
        excludeExtraneousValues: true
      });
    } catch (e) {
      throw new CommonError(
        e.type || ERROR_TYPE.SYSTEM,
        e.status || STATUS_CODE.FAIL,
        e.status ? e.clientErrorMessage : ERROR_MESSAGE.SERVER_ERROR,
        e.message
      );
    }
  }

  private async checkStudent(email: string): Promise<StudentEntity> {
    const studentEntity = await this.studentRepository.findOneByEmail(email);
    assertNotExistStudent(studentEntity);
    return studentEntity;
  }

  private async checkSchool(schoolRegion: string, schoolName: string): Promise<SchoolEntity> {
    const schoolEntity = await this.schoolRepository.findOneByRegionAndName(schoolRegion, schoolName);
    assertNotExistSchool(schoolEntity);
    return schoolEntity;
  }

  private async checkSchoolPage(schoolEntity: SchoolEntity, pageName: string): Promise<SchoolPageEntity> {
    const schoolPageEntity = await this.schoolPageRepository.findOneBySchoolIdAndName(schoolEntity.schoolId, pageName);
    assertNotExistSchoolPage(schoolPageEntity);
    return schoolPageEntity;
  }
}

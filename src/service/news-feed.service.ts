import { Injectable } from "@nestjs/common";
import { CommonError } from "src/utils/exception/common-exception";
import { ERROR_TYPE } from "../utils/enum";
import { ERROR_MESSAGE, STATUS_CODE } from "../utils/constant";
import { CreateNewsFeedRequestDto } from "../dto/create-news-feed-request.dto";
import { UpdateNewsFeedRequestDto } from "../dto/update-news-feed-request.dto";
import { DeleteNewsFeedRequestDto } from "../dto/delete-news-feed-request.dto";
import { AdminInfo } from "../utils/role/user-info";
import { assertNotExistCrew } from "./validator/crew-validator";
import { CrewRepository } from "../repository/crew.repository";
import { SchoolNewsRepository } from "../repository/school-news.repository";
import { assertNotExistSchool } from "./validator/school-validator";
import { SchoolRepository } from "../repository/school.repository";
import { SchoolPageRepository } from "../repository/school-page.repository";
import { SchoolEntity } from "../entity/school.entity";
import { assertNotExistSchoolPage } from "./validator/school-page-validator";
import { SchoolPageEntity } from "../entity/school-page.entity";
import { SchoolNewsEntity } from "../entity/school-news.entity";
import { assertNotExistSchoolNews } from "./validator/school-news-validator";

@Injectable()
export class NewsFeedService {

  constructor(
    private readonly crewRepository: CrewRepository,
    private readonly schoolRepository: SchoolRepository,
    private readonly schoolPageRepository:SchoolPageRepository,
    private readonly schoolNewsRepository: SchoolNewsRepository,
  ) {
  }

  async createNewsFeed(
    body: CreateNewsFeedRequestDto,
    admin: AdminInfo,
  ) {
    try {
      const { email, schoolRegion, schoolName } = admin
      const { pageName, title, content } = body

      await this.checkCrew(email);
      const schoolEntity = await this.checkSchool(schoolRegion, schoolName);
      const schoolPageEntity = await this.checkSchoolPage(schoolEntity, pageName);
      await this.schoolNewsRepository.save(schoolPageEntity.schoolPageId, title, content)
    } catch (e) {
      throw new CommonError(
        e.type || ERROR_TYPE.SYSTEM,
        e.status || STATUS_CODE.FAIL,
        e.status ? e.clientErrorMessage : ERROR_MESSAGE.SERVER_ERROR,
        e.message,
      );
    }
  }

  async updateNewsFeed(
    body: UpdateNewsFeedRequestDto,
    admin: AdminInfo
  ) {
    try {
      const { email, schoolRegion, schoolName } = admin
      const { pageName, title, content } = body

      await this.checkCrew(email);
      const schoolEntity = await this.checkSchool(schoolRegion, schoolName);
      const schoolPageEntity = await this.checkSchoolPage(schoolEntity, pageName);
      const schoolNewsEntity = await this.checkSchoolNews(schoolPageEntity, title);
      schoolNewsEntity.onChangeTitleAndContent(title, content);
      await this.schoolNewsRepository.update(schoolNewsEntity);
    } catch (e) {
      throw new CommonError(
        e.type || ERROR_TYPE.SYSTEM,
        e.status || STATUS_CODE.FAIL,
        e.status ? e.clientErrorMessage : ERROR_MESSAGE.SERVER_ERROR,
        e.message,
      );
    }
  }

  async deleteNewsFeed(
    query: DeleteNewsFeedRequestDto,
    admin: AdminInfo
  ) {
    try {
      const { email, schoolRegion, schoolName } = admin
      const { pageName, title } = query

      await this.checkCrew(email);
      const schoolEntity = await this.checkSchool(schoolRegion, schoolName);
      const schoolPageEntity = await this.checkSchoolPage(schoolEntity, pageName);
      const schoolNewsEntity = await this.checkSchoolNews(schoolPageEntity, title);
      await this.schoolNewsRepository.softDelete(schoolNewsEntity);
    } catch (e) {
      throw new CommonError(
        e.type || ERROR_TYPE.SYSTEM,
        e.status || STATUS_CODE.FAIL,
        e.status ? e.clientErrorMessage : ERROR_MESSAGE.SERVER_ERROR,
        e.message,
      );
    }
  }

  private async checkCrew(email: string) {
    const crewEntity = await this.crewRepository.findOneByEmail(email);
    assertNotExistCrew(crewEntity);
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

  private async checkSchoolNews(schoolPageEntity: SchoolPageEntity, title: string): Promise<SchoolNewsEntity> {
    const schoolNewsEntity = await this.schoolNewsRepository.findOneBySchoolPageIdAndTitle(schoolPageEntity.schoolPageId, title);
    assertNotExistSchoolNews(schoolNewsEntity);
    return schoolNewsEntity;
  }
}

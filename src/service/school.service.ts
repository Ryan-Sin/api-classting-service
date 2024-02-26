import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { CommonError } from "src/utils/exception/common-exception";
import { ERROR_TYPE } from "../utils/enum";
import { ERROR_MESSAGE, STATUS_CODE } from "../utils/constant";
import { CreateSchoolPageRequestDto } from "../dto/create-school-page-request.dto";
import { GetSchoolPageListRequestDto } from "../dto/get-school-page-list-request.dto";
import { SchoolRepository } from "../repository/school.repository";
import { CrewRepository } from "../repository/crew.repository";
import { SchoolPageRepository } from "../repository/school-page.repository";
import { assertNotExistCrew } from "./validator/crew-validator";
import { assertNotExistSchool } from "./validator/school-validator";
import { plainToInstance } from "class-transformer";
import { SchoolPageListData } from "../dto/data/school-page-list.data";
import { AdminInfo } from "../utils/role/user-info";
import { assertExistSchoolPage } from "./validator/school-page-validator";

@Injectable()
export class SchoolService {

  constructor(
    private readonly crewRepository: CrewRepository,
    private readonly schoolRepository: SchoolRepository,
    private readonly schoolPageRepository: SchoolPageRepository
  ) {
  }

  async createSchoolPage(
    createSchoolPageRequestDto: CreateSchoolPageRequestDto,
    admin: AdminInfo
  ) {
    try {
      const { email, schoolRegion, schoolName } = admin;
      const { pageName } = createSchoolPageRequestDto;

      const crewEntity = await this.crewRepository.findOneByEmail(email);
      assertNotExistCrew(crewEntity);

      const schoolEntity = await this.schoolRepository.findOneByReginAndName(schoolRegion, schoolName);

      const schoolPageEntity = await this.schoolPageRepository.findOneBySchoolIdAndName(schoolEntity.schoolId, pageName);
      assertExistSchoolPage(schoolPageEntity);

      await this.schoolPageRepository.save(schoolEntity.schoolId, pageName);
    } catch (e) {
      throw new CommonError(
        e.type || ERROR_TYPE.SYSTEM,
        e.status || STATUS_CODE.FAIL,
        e.status ? e.clientErrorMessage : ERROR_MESSAGE.SERVER_ERROR,
        e.message
      );
    }
  }

  async getSchoolPageList(
    getSchoolPageListRequestDto: GetSchoolPageListRequestDto,
    req: Request
  ): Promise<SchoolPageListData> {
    try {
      const { schoolRegion, schoolName, offset, limit } = getSchoolPageListRequestDto;

      const schoolEntity = await this.schoolRepository.findOneByRegionAndName(schoolRegion, schoolName);
      assertNotExistSchool(schoolEntity);

      const [list, totalCount] = await this.schoolPageRepository.findBySchoolIdPagination(schoolEntity.schoolId, offset, limit);

      return plainToInstance(SchoolPageListData, { totalCount, list }, { excludeExtraneousValues: true });
    } catch (e) {
      throw new CommonError(
        e.type || ERROR_TYPE.SYSTEM,
        e.status || STATUS_CODE.FAIL,
        e.status ? e.clientErrorMessage : ERROR_MESSAGE.SERVER_ERROR,
        e.message
      );
    }
  }
}

import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { CommonError } from "src/utils/common-exception";
import { ERROR_TYPE, LEVEL } from "../utils/enum";
import { ERROR_MESSAGE, STATUS_CODE } from "../utils/constant";
import { CrewSignUpRequestDto } from "../dto/crew-sign-up-request.dto";
import { StudentSignUpRequestDto } from "../dto/student-sign-up-request.dto";
import { SignInRequestDto } from "../dto/sign-in-request.dto";
import { JwtTokenService } from "./jwt-token.service";
import { CrewRepository } from "../repository/crew.repository";
import { StudentRepository } from "../repository/student.repository";
import { SchoolRepository } from "../repository/school.repository";
import { assertExistCrew, assertNotExistCrew, assertCrewPasswordMismatch } from "./validator/crew-validator";
import { passwordDecryption, passwordEncryption } from "../utils/common";
import {
  assertExistStudent,
  assertNotExistStudent,
  assertStudentPasswordMismatch
} from "./validator/student-validator";
import { SchoolEntity } from "../entity/school.entity";
import { plainToInstance } from "class-transformer";
import { ResponseTokenData } from "../dto/data/response-token.data";

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtTokenService: JwtTokenService,
    private readonly schoolRepository: SchoolRepository,
    private readonly crewRepository: CrewRepository,
    private readonly studentRepository: StudentRepository
  ) {
  }

  async onCrewSignUp(
    crewSignUpRequestDto: CrewSignUpRequestDto,
    req: Request
  ) {
    try {
      const { email, password, schoolRegion, schoolName, name } = crewSignUpRequestDto;

      const crewEntity = await this.crewRepository.findOneByEmail(email);
      assertExistCrew(crewEntity);

      let schoolEntity: SchoolEntity;
      schoolEntity = await this.schoolRepository.findOneByReginAndName(schoolRegion, schoolName);
      if (!schoolEntity) {
        schoolEntity = await this.schoolRepository.save(schoolRegion, schoolName);
      }

      const { salt, encryptionPassword } = passwordEncryption(password);
      await this.crewRepository.save(email, encryptionPassword, salt, schoolEntity.schoolId, name);
    } catch (e) {
      throw new CommonError(
        e.type || ERROR_TYPE.SYSTEM,
        e.status || STATUS_CODE.FAIL,
        e.status ? e.clientErrorMessage : ERROR_MESSAGE.SERVER_ERROR,
        e.message
      );
    }
  }

  async onStudentSignUp(
    studentSignUpRequestDto: StudentSignUpRequestDto,
    req: Request
  ) {
    try {
      const { email, password, name } = studentSignUpRequestDto;

      const studentEntity = await this.studentRepository.findOneByEmail(email);
      assertExistStudent(studentEntity);

      const { salt, encryptionPassword } = passwordEncryption(password);
      await this.studentRepository.save(email, encryptionPassword, salt, name);
    } catch (e) {
      throw new CommonError(
        e.type || ERROR_TYPE.SYSTEM,
        e.status || STATUS_CODE.FAIL,
        e.status ? e.clientErrorMessage : ERROR_MESSAGE.SERVER_ERROR,
        e.message
      );
    }
  }

  async onSignIn(signInRequestDto: SignInRequestDto, req: Request): Promise<ResponseTokenData> {
    try {
      const { email, password, type } = signInRequestDto;

      let accessToken;
      switch (type) {
        case LEVEL.ADMIN:
          const crewEntity = await this.crewRepository.findOneByEmail(email);
          assertNotExistCrew(crewEntity);

          const crewDecryptionPassword = passwordDecryption(crewEntity.salt, password);
          assertCrewPasswordMismatch(crewEntity, crewDecryptionPassword)

          accessToken = await this.jwtTokenService.generateAdminAccessToken(crewEntity);
          break;
        case LEVEL.STUDENT:
           const studentEntity = await this.studentRepository.findOneByEmail(email);
          assertNotExistStudent(studentEntity);

          const studentDecryptionPassword = passwordDecryption(studentEntity.salt, password);
          assertStudentPasswordMismatch(studentEntity, studentDecryptionPassword)

          accessToken = await this.jwtTokenService.generateClientAccessToken(studentEntity);
          break;
                  default:
          throw new CommonError(
            ERROR_TYPE.DEVELOPER,
            STATUS_CODE.FAIL,
            ERROR_MESSAGE.INVALID_TYPE_SETTING
          );
      }

      return plainToInstance(ResponseTokenData, {accessToken})
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

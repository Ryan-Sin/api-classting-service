import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { CommonError } from 'src/utils/common-exception';
import { ERROR_TYPE } from '../utils/enum';
import { ERROR_MESSAGE, STATUS_CODE } from '../utils/constant';
import { CrewSignUpRequestDto } from '../dto/crew-sign-up-request.dto';
import { StudentSignUpRequestDto } from '../dto/student-sign-up-request.dto';
import { SignInRequestDto } from '../dto/sign-in-request.dto';

@Injectable()
export class AuthService {
  onCrewSignUp(
    crewSignUpRequestDto: CrewSignUpRequestDto,
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

  onStudentSignUp(
    studentSignUpRequestDto: StudentSignUpRequestDto,
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

  onSignIn(signInRequestDto: SignInRequestDto, req: Request): Promise<any> {
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

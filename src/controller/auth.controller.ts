import { Controller, Req, Res, HttpStatus, Post, Body } from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { Request, Response } from "express";
import { ApiResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CrewSignUpRequestDto } from "../dto/crew-sign-up-request.dto";
import { CrewSignUpResponseDto } from "../dto/crew-sign-up-response.dto";
import { StudentSignUpRequestDto } from "../dto/student-sign-up-request.dto";
import { StudentSignUpResponseDto } from "../dto/student-sign-up-response.dto";
import { SignInRequestDto } from "../dto/sign-in-request.dto";
import { SignInResponseDto } from "../dto/sign-in-response.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiOperation({
    summary: "학교 관리자 회원 가입",
    description: "각 학교에 관리자 계정을 생성합니다."
  })
  @ApiResponse({
    description: "성공여부",
    type: CrewSignUpResponseDto
  })
  @Post("/v1/crew/sign-up")
  async onCrewSignUp(
    @Body() crewSignUpRequestDto: CrewSignUpRequestDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    await this.authService.onCrewSignUp(crewSignUpRequestDto, req);

    return res.status(HttpStatus.OK).json(new CrewSignUpResponseDto());
  }

  @ApiOperation({
    summary: "학생 회원 가입",
    description: "각 학생 계정을 생성합니다."
  })
  @ApiResponse({
    description: "성공여부",
    type: StudentSignUpResponseDto
  })
  @Post("/v1/student/sign-up")
  async onStudentSignUp(
    @Body() studentSignUpRequestDto: StudentSignUpRequestDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    await this.authService.onStudentSignUp(studentSignUpRequestDto, req);

    return res.status(HttpStatus.OK).json(new StudentSignUpResponseDto());
  }

  @ApiOperation({
    summary: "로그인",
    description: "타입에 따른 학생 및 학교 관리자 로그인"
  })
  @ApiResponse({
    description: "성공여부",
    type: SignInResponseDto
  })
  @Post("/v1/sign-in")
  async onSignIn(
    @Body() signInRequestDto: SignInRequestDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const data = await this.authService.onSignIn(signInRequestDto, req);

    const response = new SignInResponseDto();
    response.data = data;

    return res.status(HttpStatus.OK).json(response);
  }
}

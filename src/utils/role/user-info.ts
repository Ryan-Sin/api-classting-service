import { IsString } from "class-validator";

export class AdminInfo {
  @IsString()
  version: string;

  @IsString()
  email: string;

  @IsString()
  schoolRegion: string;

  @IsString()
  schoolName: string;

  @IsString()
  createdAt: string;
}

export class StudentInfo {
  @IsString()
  version: string;

  @IsString()
  email: string;

  @IsString()
  createdAt: string;
}
import {Injectable} from "@nestjs/common";
import * as dayjs from "dayjs";
import {JwtService} from "@nestjs/jwt";
import { CrewEntity } from "../entity/crew.entity";
import { StudentEntity } from "../entity/student.entity";


@Injectable()
export class JwtTokenService {

    constructor(private readonly jwtService: JwtService) {
    }

    generateClientAccessToken(studentEntity: StudentEntity): Promise<string> {
        const payload = {
            version: "v1",
            email: studentEntity.email,
            createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss")
        };

        return this.jwtService.signAsync(payload);
    }

    generateAdminAccessToken(crewEntity: CrewEntity): Promise<string> {
        const payload = {
            version: "v1",
            email: crewEntity.email,
            createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss")
        };

        return this.jwtService.signAsync(payload);
    }
}

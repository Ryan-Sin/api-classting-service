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
            schoolRegion: crewEntity.school.region,
            schoolName: crewEntity.school.name,
            createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss")
        };

        return this.jwtService.signAsync(payload);
    }

    verifyToken(token: string): Promise<any> {
        try {
            return this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
        } catch (error) {
            return null;
        }
    }
}

import {Inject, Injectable} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";
import {CrewEntity} from "../entity/crew.entity";

@Injectable()
export class CrewRepository {
    private readonly repository: Repository<CrewEntity>;

    constructor(
        @Inject('DATA_SOURCE') dataSource: DataSource) {
        this.repository = dataSource.getRepository(CrewEntity).extend({});
    }

  findOneByEmail(email: string) {
   return  this.repository.findOne({
      where:{email}
    })
  }

  save(email: string, password: string, salt: string, schoolId:number, name: string) {
    const crewEntity = this.repository.create({
      schoolId,
      email,
      password,
      salt,
      name
    });
    return this.repository.save(crewEntity);
  }
}
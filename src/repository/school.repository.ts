import {Inject, Injectable} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";
import {SchoolEntity} from "../entity/school.entity";

@Injectable()
export class SchoolRepository {
    private readonly repository: Repository<SchoolEntity>;

    constructor(
        @Inject('DATA_SOURCE') dataSource: DataSource) {
        this.repository = dataSource.getRepository(SchoolEntity).extend({});
    }

  findOneByReginAndName(region: string, name: string) {
    return  this.repository.findOne({
      where: {
        region,
        name
      }
    })
  }

  save(region: string, name: string) {
      const schoolEntity = this.repository.create({
        region,
        name
      })

    return this.repository.save(schoolEntity)
  }

  findOneByRegionAndName(region: string, name: string) {
    return this.repository.findOne({
      where: {
        region,
        name
      }
    })
  }
}
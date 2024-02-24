import {Inject, Injectable} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";
import {SchoolPageEntity} from "../entity/school-page.entity";

@Injectable()
export class SchoolPageRepository {
    private readonly repository: Repository<SchoolPageEntity>;

    constructor(
        @Inject('DATA_SOURCE') dataSource: DataSource) {
        this.repository = dataSource.getRepository(SchoolPageEntity).extend({});
    }

    save(schoolId: number, name: string) {
        const schoolPageEntity = this.repository.create({
            schoolId,
            name,
        });

        return this.repository.save(schoolPageEntity)
    }

  findBySchoolIdPagination(schoolId: number, offset: number, limit: number) {
      return this.repository.findAndCount({
          relations: ["school"],
          where: {
              schoolId
          },
          skip: offset,
          take: limit,
      })
  }

  findBySchoolIdAndName(schoolId: number, name: string) {
      return this.repository.findOne({
        where: {
          schoolId,
          name
        }
      })
  }
}
import {Inject, Injectable} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";
import {SchoolNewsEntity} from "../entity/school-news.entity";

@Injectable()
export class SchoolNewsRepository {
    private readonly repository: Repository<SchoolNewsEntity>;

    constructor(
        @Inject('DATA_SOURCE') dataSource: DataSource) {
        this.repository = dataSource.getRepository(SchoolNewsEntity).extend({});
    }

    save(schoolPageId: number, title: string, content: string) {
        const schoolNewsEntity = this.repository.create({
            schoolPageId,
            title,
            content
        });

        return this.repository.save(schoolNewsEntity)
    }

    findOneBySchoolPageIdAndTitle(schoolPageId: number, title: string) {
        return this.repository.findOne({
            where: {
                schoolPageId,
                title
            }
        })
    }

    update(schoolNewsEntity: SchoolNewsEntity) {
        return this.repository.update(schoolNewsEntity.schoolNewsId, schoolNewsEntity);
    }

    softDelete(schoolNewsEntity: SchoolNewsEntity) {
        return this.repository.softDelete(schoolNewsEntity.schoolNewsId)
    }
}
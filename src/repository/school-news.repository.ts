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

}
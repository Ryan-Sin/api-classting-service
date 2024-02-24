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

}
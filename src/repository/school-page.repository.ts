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

}
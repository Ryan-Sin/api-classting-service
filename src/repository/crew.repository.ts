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

}
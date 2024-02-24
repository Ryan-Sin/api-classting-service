import {Inject, Injectable} from '@nestjs/common';
import {DataSource, Repository} from "typeorm";
import {StudentEntity} from "../entity/student.entity";

@Injectable()
export class StudentRepository {
    private readonly repository: Repository<StudentEntity>;

    constructor(
        @Inject('DATA_SOURCE') dataSource: DataSource) {
        this.repository = dataSource.getRepository(StudentEntity).extend({});
    }

}
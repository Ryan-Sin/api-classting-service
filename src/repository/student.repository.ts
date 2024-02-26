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

  findOneByEmail(email: string) {
    return this.repository.findOne({
      where: {
        email,
      }
    })
  }

  async save(email: string, password: string, salt: string, name: string) {
     const studentEntity = this.repository.create({
      email,
      password,
      salt,
      name
    });

     return this.repository.save(studentEntity);
  }
}
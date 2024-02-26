import { Inject, Injectable } from "@nestjs/common";
import { Brackets, DataSource, Repository } from "typeorm";
import { SubscriptionEntity } from "../entity/subscription.entity";
import dayjs from "dayjs";

@Injectable()
export class SubscriptionRepository {
  private readonly repository: Repository<SubscriptionEntity>;

  constructor(
    @Inject("DATA_SOURCE") dataSource: DataSource) {
    this.repository = dataSource.getRepository(SubscriptionEntity).extend({});
  }

  save(studentId: number, schoolPageId: number, now: dayjs.Dayjs) {
    const subscriptionEntity = this.repository.create({
      studentId,
      schoolPageId,
      startDate: now.toDate()
    });

    return this.repository.save(subscriptionEntity);
  }

  findSchoolPageByStudentIdPagination(studentId: number, offset: number, limit: number) {
    return this.repository.findAndCount({
      relations: ["schoolPage", "schoolPage.school"],
      where: {
        studentId
      },
      skip: offset,
      take: limit
    });
  }

  async findByStudentIdPaginationCount(studentId: number) {
    const list = await this.repository.createQueryBuilder("sc")
      .leftJoinAndMapOne("sc.schoolPage", "school_page", "sp", "sc.schoolPageId = sp.schoolPageId")
      .leftJoinAndMapOne("sp.school", "school", "s", "sp.schoolId = s.schoolId")
      .leftJoinAndMapOne("sp.schoolNews", "school_news", "sn", "sp.school_page_id = sn.school_page_id")
      .where("sc.studentId = :studentId", { studentId })
      .andWhere("sc.startDate <= sn.createdAt")
      .andWhere("IFNULL(sc.cancelDate, NOW()) >= sn.createdAt")
      .getRawMany();
    return list.length;
  }

  findByStudentIdPagination(studentId: number, offset: number, limit: number) {
    return this.repository.createQueryBuilder("sc")
      .select(["s.name as schoolName", "s.region as schoolRegion", "sn.title as title", "sn.content as content"])
      .leftJoinAndMapOne("sc.schoolPage", "school_page", "sp", "sc.schoolPageId = sp.schoolPageId")
      .leftJoinAndMapOne("sp.school", "school", "s", "sp.schoolId = s.schoolId")
      .leftJoinAndMapOne("sp.schoolNews", "school_news", "sn", "sp.school_page_id = sn.school_page_id")
      .where("sc.studentId = :studentId", { studentId })
      .andWhere("sc.startDate <= sn.createdAt")
      .andWhere("IFNULL(sc.cancelDate, NOW()) >= sn.createdAt")
      .skip(offset)
      .take(limit)
      .orderBy("sn.createdAt", "DESC")
      .getRawMany();
  }

  findOneByStudentIdAndSchoolPageId(studentId: number, schoolPageId: number) {
    return this.repository.findOne({
      where: {
        studentId,
        schoolPageId
      }
    });
  }

  update(subscriptionEntity: SubscriptionEntity) {
    return this.repository.update(subscriptionEntity.subscriptionId, subscriptionEntity);
  }

  async findByStudentIdAndSchoolPageIdPaginationCount(studentId: number, schoolPageId: number) {
    const list = await this.repository.createQueryBuilder("sc")
      .leftJoinAndMapOne("sc.schoolPage", "school_page", "sp", "sc.schoolPageId = sp.schoolPageId")
      .leftJoinAndMapOne("sp.school", "school", "s", "sp.schoolId = s.schoolId")
      .leftJoinAndMapOne("sp.schoolNews", "school_news", "sn", "sp.school_page_id = sn.school_page_id")
      .where("sc.studentId = :studentId", { studentId })
      .andWhere("sp.schoolPageId = :schoolPageId", { schoolPageId })
      .andWhere("sc.startDate <= sn.createdAt")
      .andWhere("IFNULL(sc.cancelDate, NOW()) >= sn.createdAt")
      .getRawMany();
    return list.length;
  }

  findByStudentIdAndSchoolPageIdPagination(studentId: number, schoolPageId: number, offset: number, limit: number) {
    return this.repository.createQueryBuilder("sc")
      .select(["s.name as schoolName", "s.region as schoolRegion", "sn.title as title", "sn.content as content"])
      .leftJoinAndMapOne("sc.schoolPage", "school_page", "sp", "sc.schoolPageId = sp.schoolPageId")
      .leftJoinAndMapOne("sp.school", "school", "s", "sp.schoolId = s.schoolId")
      .leftJoinAndMapOne("sp.schoolNews", "school_news", "sn", "sp.school_page_id = sn.school_page_id")
      .where("sc.studentId = :studentId", { studentId })
      .andWhere("sp.schoolPageId = :schoolPageId", { schoolPageId })
      .andWhere("sc.startDate <= sn.createdAt")
      .andWhere("IFNULL(sc.cancelDate, NOW()) >= sn.createdAt")
      .skip(offset)
      .take(limit)
      .orderBy("sn.createdAt", "DESC")
      .getRawMany();
  }
}
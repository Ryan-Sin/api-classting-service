import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { SchoolNewsEntity } from "./school-news.entity";
import { SchoolEntity } from "./school.entity";
import { SubscriptionEntity } from "./subscription.entity";

@Index("UQ_school_page_1", ["schoolId", "name"], { unique: true })
@Entity("school_page", { schema: "classting" })
export class SchoolPageEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "school_page_id",
    comment: "고유 키"
  })
  schoolPageId: number;

  @Column("int", { name: "school_id", comment: "학교 고유 키" })
  schoolId: number;

  @Column("varchar", { name: "name", comment: "페이지 이름", length: 50 })
  name: string;

  @Column("datetime", {
    name: "created_at",
    comment: "생성일",
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: Date;

  @OneToMany(() => SchoolNewsEntity, (schoolNews) => schoolNews.schoolPage, {lazy:true})
  schoolNews: SchoolNewsEntity[];

  @ManyToOne(() => SchoolEntity, (school) => school.schoolPages, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
    lazy: true
  })
  @JoinColumn([{ name: "school_id", referencedColumnName: "schoolId" }])
  school: SchoolEntity;

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.schoolPage, { lazy: true })
  subscriptions: SubscriptionEntity[];
}

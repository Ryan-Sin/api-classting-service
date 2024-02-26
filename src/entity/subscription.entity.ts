import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SchoolPageEntity } from "./school-page.entity";
import { StudentEntity } from "./student.entity";
import dayjs from "dayjs";

@Index("UQ_subscription_1", ["studentId", "schoolPageId"], { unique: true })
@Entity("subscription", { schema: "classting" })
export class SubscriptionEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "subscription_id",
    comment: "고유 키",
  })
  subscriptionId: number;

  @Column("int", { name: "student_id", comment: "학생 고유 키" })
  studentId: number;

  @Column("int", { name: "school_page_id", comment: "학교 페이지" })
  schoolPageId: number;

  @Column("datetime", { name: "start_date", comment: "구독 시작일" })
  startDate: Date;

  @Column("datetime", { name: "cancel_date", comment: "구독 취소일", nullable: true})
  cancelDate: Date;

  @ManyToOne(() => SchoolPageEntity, (schoolPage) => schoolPage.subscriptions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([
    { name: "school_page_id", referencedColumnName: "schoolPageId" },
  ])
  schoolPage: SchoolPageEntity;

  @ManyToOne(() => StudentEntity, (student) => student.subscriptions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",

  })
  @JoinColumn([{ name: "student_id", referencedColumnName: "studentId" }])
  student: StudentEntity;

  cancelSubscription(now: dayjs.Dayjs) {
    this.cancelDate = now.toDate();
  }
}

import {
  Column, CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { SubscriptionEntity } from "./subscription.entity";

@Index("UQ_student_1", ["email"], { unique: true })
@Entity("student", { schema: "classting" })
export class StudentEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "student_id",
    comment: "고유 키"
  })
  studentId: number;

  @Column("varchar", {
    name: "email",
    unique: true,
    comment: "이메일",
    length: 30
  })
  email: string;

  @Column("varchar", { name: "password", comment: "비밀번호", length: 255 })
  password: string;

  @Column("varchar", { name: "salt", comment: "암호화 키", length: 255 })
  salt: string;

  @Column("varchar", { name: "name", comment: "이름", length: 30 })
  name: string;

  @CreateDateColumn({
    type: "datetime",
    name: "created_at",
    comment: "생성일",
    default: () => "CURRENT_TIMESTAMP"
  })
  createdAt: Date;

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.student, { lazy: true })
  subscriptions: SubscriptionEntity[];
}

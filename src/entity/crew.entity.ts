import {
  Column, CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { SchoolEntity } from "./school.entity";

@Index("UQ_crew_1", ["email"], { unique: true })
@Entity("crew", { schema: "classting" })
export class CrewEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "crew_id",
    comment: "고유 키",
  })
  crewId: number;

  @Column("int", { name: "school_id", comment: "학교 고유 키" })
  schoolId: number;

  @Column("varchar", {
    name: "email",
    unique: true,
    comment: "이메일",
    length: 30,
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
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ManyToOne(() => SchoolEntity, (school) => school.crews, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "school_id", referencedColumnName: "schoolId" }])
  school: SchoolEntity;
}

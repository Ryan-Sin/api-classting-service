import {
  Column, CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { CrewEntity } from "./crew.entity";
import { SchoolPageEntity } from "./school-page.entity";

@Index("UQ_school_1", ["region", "name"], { unique: true })
@Entity("school", { schema: "classting" })
export class SchoolEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "school_id",
    comment: "고유 키",
  })
  schoolId: number;

  @Column("varchar", { name: "region", comment: "지역", length: 50 })
  region: string;

  @Column("varchar", { name: "name", comment: "이름", length: 50 })
  name: string;

  @CreateDateColumn({
    type: "datetime",
    name: "created_at",
    comment: "생성일",

  })
  createdAt: Date;

  @OneToMany(() => CrewEntity, (crew) => crew.school, {lazy:true})
  crews: CrewEntity[];

  @OneToMany(() => SchoolPageEntity, (schoolPage) => schoolPage.school, {lazy:true})
  schoolPages: SchoolPageEntity[];
}

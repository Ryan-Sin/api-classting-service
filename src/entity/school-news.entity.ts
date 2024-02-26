import {
  Column, CreateDateColumn, DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { SchoolPageEntity } from "./school-page.entity";

@Index("UQ_school_news_1", ["schoolPageId", "title"], { unique: true })
@Entity("school_news", { schema: "classting" })
export class SchoolNewsEntity {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "school_news_id",
    comment: "고유 키",
  })
  schoolNewsId: number;

  @Column("int", { name: "school_page_id", comment: "학교 페이지 고유 키" })
  schoolPageId: number;

  @Column("varchar", { name: "title", comment: "제목", length: 255 })
  title: string;

  @Column("varchar", { name: "content", comment: "내용", length: 255 })
  content: string;

  @CreateDateColumn({
    type: "datetime",
    name: "created_at",
    comment: "생성일"
  })
  createdAt: Date;

  @DeleteDateColumn( {
    type: "datetime",
    name: "deleted_at",
    nullable: true,
    comment: "삭제일"
  })
  deletedAt: Date | null;

  @ManyToOne(() => SchoolPageEntity, (schoolPage) => schoolPage.schoolNews, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
    lazy:true
  })
  @JoinColumn([
    { name: "school_page_id", referencedColumnName: "schoolPageId" },
  ])
  schoolPage: SchoolPageEntity;

  onChangeTitleAndContent(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}

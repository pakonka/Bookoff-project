import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("authors")
export class Author {
  @PrimaryGeneratedColumn({ name: "author_id" })
  id: number;

  @Column({ name: "author_name", type: "nvarchar", length: 511 })
  author_name: string;

  @Column({ name: "bio", type: "nvarchar", nullable: true })
  bio: string;

  @Column({ name: "date_of_birth", type: "date", nullable: true })
  date_of_birth: Date;

  @Column({
    name: "nationality",
    type: "nvarchar",
    length: 100,
    nullable: true,
  })
  nationality: string;

  @Column({
    name: "slug",
    type: "nvarchar",
    length: 255,
    nullable: true,
  })
  slug: string;

  @Column({
    name: "created_at",
    type: "datetime2",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;
}

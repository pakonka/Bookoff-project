import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("publishers")
export class Publisher {
  @PrimaryGeneratedColumn({ name: "publisher_id" })
  id: number;

  @Column({ name: "publisher_name", type: "nvarchar", length: 255 })
  publisher_ame: string;

  @Column({ name: "location", type: "nvarchar", length: 255 })
  location: string;

  @Column({ name: "description", type: "nvarchar", nullable: true })
  description: string;

  @Column({ name: "slug", type: "nvarchar", length: 255, nullable: true })
  slug: string;
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./product.entity"; // Giả sử bạn có bảng sản phẩm liên kết với category
import { IsString, IsOptional } from "class-validator";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn({ name: "category_id" })
  id: number;

  @Column({ name: "category_name", type: "nvarchar", length: 255 })
  @IsString()
  category_name: string;

  @Column({ name: "description", type: "nvarchar", nullable: true })
  @IsOptional()
  @IsString()
  description: string;

  @Column({ name: "slug", type: "nvarchar", length: 255, unique: true })
  @IsString()
  slug: string;

  @Column({ name: "parent_category_id", type: "bigint", nullable: true })
  parent_category_id: number;

  @Column({ name: "created_by", type: "int", nullable: true })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true })
  updated_by: number;

  @Column({
    name: "updated_at",
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @OneToMany(() => Product, (product) => product.category_id)
  products: Product[];
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from "./product.entity";

@Entity("products_images")
export class ProductImage {
  @PrimaryGeneratedColumn("increment")
  image_id: number;

  @ManyToOne(() => Product, (product: Product) => product.product_images)
  @JoinColumn({ name: "product_id" })
  product_id: Product;

  @Column({ type: "nvarchar", length: 255 })
  image_url: string;

  @Column({ type: "nvarchar", length: 255, nullable: true })
  alt_text: string | null;

  @Column({ type: "bit", default: 0 })
  is_primary: boolean;
}

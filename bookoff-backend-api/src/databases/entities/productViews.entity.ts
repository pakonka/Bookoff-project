import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity("product_views")
export class ProductView {
  @PrimaryGeneratedColumn({ name: "view_id" })
  id: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user_id: User;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: "product_id" })
  product_id: Product;

  @Column({
    name: "viewed_at",
    type: "datetime2",
    default: () => "CURRENT_TIMESTAMP",
  })
  viewed_at: Date;
}

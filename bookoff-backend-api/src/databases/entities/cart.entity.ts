import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";

@Entity("carts")
export class Cart {
  @PrimaryGeneratedColumn("increment")
  cart_id: number;

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({ name: "user_id" })
  user_id: User;

  @ManyToOne(() => Product, (product) => product.carts)
  @JoinColumn({ name: "product_id" })
  product_id: Product;

  @Column({ type: "bigint" })
  quantity: number;

  @Column({ type: "datetime2", default: () => "GETDATE()" })
  create_at: Date;

  @Column({ type: "int", nullable: true })
  updated_by: number | null;

  @Column({ type: "datetime2", default: () => "GETDATE()" })
  updated_at: Date;
}

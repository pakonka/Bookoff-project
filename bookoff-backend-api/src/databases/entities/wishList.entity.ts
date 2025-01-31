import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";

@Entity("wishlist")
export class Wishlist {
  @PrimaryGeneratedColumn("increment")
  wishlist_id: number;

  @ManyToOne(() => User, (user) => user.wishlist)
  @JoinColumn({ name: "user_id" })
  user_id: User;

  @ManyToOne(() => Product, (product) => product.wishlist)
  @JoinColumn({ name: "product_id" })
  product_id: Product;

  @Column({ type: "datetime2", default: () => "GETDATE()" })
  create_at: Date;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn({ name: "review_id" })
  id: number;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: "product_id" })
  product_id: Product;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user_id: User;

  @Column({ name: "rating", type: "int" })
  rating: number;

  @Column({ name: "comment", type: "nvarchar", nullable: true })
  comment: string;

  @Column({
    name: "review_date",
    type: "datetime2",
    default: () => "CURRENT_TIMESTAMP",
  })
  review_date: Date;

  @Column({ name: "is_purchase", type: "bit", nullable: true })
  is_purchase: boolean;
}

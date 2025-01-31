import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity("order_items")
export class OrderItem {
  @PrimaryGeneratedColumn("increment")
  order_item_id: number;

  @ManyToOne(() => Order, (order) => order.order_items)
  @JoinColumn({ name: "order_id" })
  order_id: Order;

  @ManyToOne(() => Product, (product) => product.order_items)
  @JoinColumn({ name: "product_id" })
  product_id: Product;

  @Column({ type: "decimal", precision: 8, scale: 2 })
  price_at_purchase: number;

  @Column({ type: "bigint" })
  quantity: number;

  @Column({ type: "bigint", nullable: true })
  discount_code: number | null;
}

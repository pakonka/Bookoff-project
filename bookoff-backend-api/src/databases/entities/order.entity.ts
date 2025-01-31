import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { ShippingMethod } from "./shippingMethod.entity";
import { OrderItem } from "./orderItem.entity";
import { Payment } from "./payment.entity";
import { Discount } from "./discount.entity";
import { Voucher } from "./vouchers.entity";

@Entity("orders")
export class Order {
  @PrimaryGeneratedColumn({ name: "order_id" })
  id: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({
    name: "order_date",
    type: "datetime2",
    default: () => "CURRENT_TIMESTAMP",
  })
  order_date: Date;

  @Column({ name: "total_amount", type: "decimal", precision: 8, scale: 2 })
  total_amount: number;

  @Column({ name: "shipping_address", type: "nvarchar", nullable: false })
  shipping_address: string;

  @ManyToOne(() => ShippingMethod, { nullable: true })
  @JoinColumn({ name: "shipping_method_id" })
  shippingMethod: ShippingMethod;

  @ManyToOne(() => Discount, { nullable: true })
  @JoinColumn({ name: "discount_id" })
  discount_id: Discount;

  @ManyToOne(() => Discount, { nullable: true })
  @JoinColumn({ name: "voucher_id" })
  voucher_id: Voucher;

  @Column({ name: "order_status", type: "nvarchar", nullable: true })
  order_status: string;

  @Column({ name: "total_price", type: "decimal", precision: 8, scale: 2 })
  total_price: number;

  @Column({ name: "payment_status", type: "nvarchar", nullable: true })
  payment_status: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order_id)
  order_items: OrderItem[];

  @OneToMany(() => Payment, (payment) => payment.order_id)
  payments: Payment[];
}

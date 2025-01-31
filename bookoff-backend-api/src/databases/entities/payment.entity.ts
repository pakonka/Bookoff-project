import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Order } from "./order.entity";

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn("increment")
  payment_id: number;

  @ManyToOne(() => Order, (order) => order.payments)
  @JoinColumn({ name: "order_id" })
  order_id: Order;

  @Column({ type: "datetime2", default: () => "GETDATE()" })
  payment_date: Date;

  @Column({ type: "nvarchar", length: 50 })
  payment_method: string;

  @Column({ type: "decimal", precision: 8, scale: 2 })
  amount: number;

  @Column({ type: "nvarchar", length: 50 })
  payment_status: string;
}

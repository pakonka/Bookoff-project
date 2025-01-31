import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Voucher } from "./vouchers.entity";

@Entity("user_vouchers")
export class UserVoucher {
  @PrimaryGeneratedColumn({ name: "user_voucher_id" })
  id: number;

  @Column({ name: "user_id", type: "int" })
  userId: number;

  @Column({ name: "voucher_id", type: "int" })
  voucherId: number;

  @Column({
    name: "acquired_date",
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  acquired_date: Date;

  @Column({ name: "expiry_date", type: "datetime", nullable: true })
  expiry_date: Date;

  @Column({ name: "status", type: "nvarchar", length: 50, default: "unused" })
  status: string;

  // Mối quan hệ Many-to-One với User
  @ManyToOne(() => User, (user) => user.vouchers)
  @JoinColumn({ name: "user_id" })
  user: User;

  // Mối quan hệ Many-to-One với Voucher
  @ManyToOne(() => Voucher, (voucher) => voucher.userVouchers)
  @JoinColumn({ name: "voucher_id" })
  voucher: Voucher;
}

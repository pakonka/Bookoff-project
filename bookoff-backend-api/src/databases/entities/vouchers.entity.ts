import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserVoucher } from "./userVouchers.entity";
import { Banner } from "./banner.entity";
import { Discount } from "./discount.entity";

@Entity("vouchers")
export class Voucher {
  @PrimaryGeneratedColumn({ name: "voucher_id" })
  id: number;

  @Column({ name: "code", type: "nvarchar", length: 255 })
  code: string;

  @Column({ name: "discount_type", type: "nvarchar", length: 50 })
  discount_type: string;

  @Column({ name: "discount_value", type: "decimal", precision: 8, scale: 2 })
  discount_value: number;

  @Column({ name: "start_date", type: "datetime" })
  start_date: Date;

  @Column({ name: "end_date", type: "datetime" })
  end_date: Date;

  @Column({ name: "max_usage", type: "int" })
  max_usage: number;

  @Column({ name: "used_count", type: "int", default: 0 })
  used_count: number;

  @Column({ name: "status", type: "nvarchar", length: 50, default: "active" })
  status: string;

  // Mối quan hệ One-to-Many với UserVoucher
  @OneToMany(() => UserVoucher, (userVoucher) => userVoucher.voucher)
  userVouchers: UserVoucher[];

  @ManyToMany(() => Banner, (banner) => banner.vouchers)
  banners: Banner[];

  @ManyToOne(() => Discount, (discount) => discount.vouchers)
  @JoinColumn({ name: "discount_id" })
  discount: Discount;
}

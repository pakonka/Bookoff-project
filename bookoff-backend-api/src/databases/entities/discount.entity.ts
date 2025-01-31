import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Voucher } from "./vouchers.entity";

@Entity("discounts")
export class Discount {
  @PrimaryGeneratedColumn({ name: "discount_id" })
  id: number;

  @Column({ name: "discount_code", type: "nvarchar", length: 255 })
  discount_code: string;

  @Column({
    name: "discount_percentage",
    type: "decimal",
    precision: 8,
    scale: 2,
  })
  discount_percentage: number;

  @Column({ name: "valid_from", type: "date", nullable: true })
  valid_from: Date;

  @Column({ name: "valid_until", type: "date", nullable: true })
  valid_until: Date;

  @Column({ name: "active", type: "bit", default: 1 })
  active: boolean;

  @Column({ name: "discount_type", type: "nvarchar", length: 50 })
  discount_type: string;

  @Column({ name: "required_quantity", type: "int" })
  required_quantity: number;

  // Mối quan hệ One-to-Many với Voucher
  @OneToMany(() => Voucher, (voucher) => voucher.discount)
  vouchers: Voucher[];
}

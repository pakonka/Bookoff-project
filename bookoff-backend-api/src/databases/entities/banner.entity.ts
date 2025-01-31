import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Discount } from "./discount.entity";
import { Voucher } from "./vouchers.entity";

@Entity("banners")
export class Banner {
  @PrimaryGeneratedColumn({ name: "banner_id" })
  id: number;

  @ManyToOne(() => Discount, { nullable: true })
  @JoinColumn({ name: "discount_id" })
  discount_id: Discount;

  @Column({ name: "title", type: "nvarchar", length: 255 })
  title: string;

  @Column({ name: "image_url", type: "nvarchar", length: 500 })
  image_url: string;

  @Column({ name: "is_active", type: "bit", default: 1 })
  is_active: boolean;

  @Column({
    name: "created_at",
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;

  // Mối quan hệ Many-to-Many với Voucher
  @ManyToMany(() => Voucher, (voucher) => voucher.banners)
  @JoinTable({
    name: "banner_vouchers", // Tên bảng trung gian
    joinColumn: {
      name: "banner_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "voucher_id",
      referencedColumnName: "id",
    },
  })
  vouchers: Voucher[];
}

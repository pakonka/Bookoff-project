import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import {
  IsInt,
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
  IsEnum,
} from "class-validator";
import { Cart } from "./cart.entity";
import { Wishlist } from "./wishList.entity"; // Đảm bảo tên file khớp
import { Role } from "./role.entity";
import { ProductView } from "./productViews.entity";
import { UserVoucher } from "./userVouchers.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn({ name: "user_id" })
  @IsInt()
  id: number;

  @Column({ name: "user_name", type: "nvarchar", length: 50, unique: true })
  @IsString()
  user_name: string;

  @Column({ name: "email", type: "nvarchar", length: 255, unique: true })
  @IsEmail()
  email: string;

  @Column({ name: "password", type: "nvarchar", length: 255 })
  @IsString()
  password: string;

  @Column({ name: "first_name", type: "nvarchar", length: 100 })
  @IsString()
  first_name: string;

  @Column({ name: "last_name", type: "nvarchar", length: 100 })
  @IsString()
  last_name: string;

  @Column({ name: "phone", type: "nvarchar", length: 20, nullable: true })
  @IsOptional()
  @IsPhoneNumber(undefined) // Thay null bằng undefined
  phone: string;

  @Column({ name: "address", type: "nvarchar", length: "max" })
  @IsString()
  address: string;

  @Column({ name: "city", type: "nvarchar", length: 100 })
  @IsString()
  city: string;

  @Column({ name: "country", type: "nvarchar", length: 100, nullable: true })
  @IsOptional()
  @IsString()
  country: string;

  @Column({ name: "postal_code", type: "nvarchar", length: 20 })
  @IsString()
  postal_code: string;

  @Column({ name: "created_at", type: "datetime", default: () => "GETDATE()" })
  created_at: Date;

  @Column({ name: "is_active", type: "bit", default: true })
  is_active: boolean;

  @Column({ name: "occupation", type: "nvarchar", length: 100, nullable: true })
  @IsOptional()
  @IsString()
  occupation: string;

  @Column({
    name: "gender",
    type: "nvarchar",
    length: 10,
    enum: ["male", "female", "other"],
  })
  @IsEnum(["male", "female", "other"])
  gender: string;

  @Column({ name: "updated_by", type: "int", nullable: true })
  updated_by: number;

  @Column({ name: "updated_at", type: "datetime", default: () => "GETDATE()" })
  updated_at: Date;

  @Column({ name: "user_avatar", type: "nvarchar", nullable: true })
  user_avatar: string;

  @Column({ name: "user_point", type: "int", default: 0 })
  user_point: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role: Role;

  @OneToMany(() => Cart, (cart) => cart.user_id)
  carts: Cart[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.user_id)
  wishlist: Wishlist[];
  @OneToMany(() => ProductView, (productView) => productView.user_id)
  product_views: ProductView[];
  @OneToMany(() => UserVoucher, (userVoucher) => userVoucher.user)
  vouchers: UserVoucher[];
}

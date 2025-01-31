import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Product } from "./product.entity";

@Entity("stocks")
export class Stock {
  @PrimaryGeneratedColumn("increment")
  stock_id: number;

  @ManyToOne(() => Product, (product) => product.stocks)
  @JoinColumn({ name: "product_id" })
  product_id: Product;

  @Column({ type: "nvarchar", length: 255 })
  location: string;

  @Column({ type: "bigint" })
  reserved_stock: number;

  @Column({ type: "datetime2", default: () => "GETDATE()" })
  update_at: Date;

  @Column({ type: "bigint" })
  available_stock: number;

  @Column({ type: "nvarchar", length: 255, nullable: true })
  transaction_id: string | null;

  @Column({ type: "nvarchar", length: 100, nullable: true })
  batch_number: string | null;
}

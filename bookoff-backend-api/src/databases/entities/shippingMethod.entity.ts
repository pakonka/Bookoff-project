import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("shipping_methods")
export class ShippingMethod {
  @PrimaryGeneratedColumn("increment")
  method_id: number;

  @Column({ type: "nvarchar", length: 255 })
  method_name: string;

  @Column({ type: "decimal", precision: 8, scale: 2 })
  cost: number;

  @Column({ type: "nvarchar", length: 50 })
  delivery_time: string;
}

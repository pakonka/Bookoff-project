import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Category } from "./category.entity";
import { Publisher } from "./publisher.entity";
import { Author } from "./author.entity";
import { Discount } from "./discount.entity";
import { Review } from "./review.entity";
import { OrderItem } from "./orderItem.entity";
import { ProductImage } from "./productImage.entity";
import { Cart } from "./cart.entity";
import { Stock } from "./stock.entity";
import { Wishlist } from "./wishList.entity";
import { ProductView } from "./productViews.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn({ name: "product_id" })
  id: number;

  @ManyToOne(() => Category, { nullable: false })
  @JoinColumn({ name: "category_id" })
  category_id: Category;

  @ManyToOne(() => Category, { nullable: true })
  @JoinColumn({ name: "subcategory_id" })
  subcategory_id: Category;

  @ManyToOne(() => Publisher, { nullable: false })
  @JoinColumn({ name: "publisher_id" })
  publisher_id: Publisher;

  @ManyToOne(() => Author, { nullable: false })
  @JoinColumn({ name: "author_id" })
  author_id: Author;

  @Column({ name: "title", type: "nvarchar", length: 255 })
  title: string;

  @Column({ name: "release_date", type: "date" })
  release_date: Date;

  @Column({ name: "description", type: "nvarchar", nullable: true })
  description: string;

  @Column({ name: "price", type: "decimal", precision: 8, scale: 2 })
  price: number;

  @Column({
    name: "created_at",
    type: "datetime2",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;

  @Column({ name: "created_by", type: "int", nullable: true })
  created_by: number;

  @Column({ name: "updated_by", type: "int", nullable: true })
  updated_by: number;

  @Column({
    name: "updated_at",
    type: "datetime2",
    default: () => "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @ManyToOne(() => Discount, { nullable: true })
  @JoinColumn({ name: "discount_id" })
  discount_id: Discount;

  @Column({
    name: "SKU",
    type: "nvarchar",
    length: 100,
    nullable: true,
  })
  SKU: string;

  @Column({ name: "slug", type: "nvarchar", length: 255, unique: true })
  slug: string;

  @OneToMany(() => Review, (review) => review.product_id)
  reviews: Review[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product_id)
  order_items: OrderItem[];

  @OneToMany(
    () => ProductImage,
    (productImage: ProductImage) => productImage.product_id
  )
  product_images: ProductImage[];

  @OneToMany(() => Cart, (cart) => cart.product_id)
  carts: Cart[];

  @OneToMany(() => Stock, (stock) => stock.product_id)
  stocks: Stock[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.product_id)
  wishlist: Wishlist[];
  @OneToMany(() => ProductView, (productView) => productView.product_id)
  product_views: ProductView[];
}

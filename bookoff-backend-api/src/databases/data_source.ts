import "reflect-metadata";
import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
  type: "mssql",
  host: "DESKTOP-VNN8TE6", //Computer Name
  port: 1433,
  username: "bookoff",
  password: "123456789",
  database: "DB Bookoff", //Tên Database
  entities: ["src/databases/entities/*.entity{.ts,.js}"], //Chỉ rõ thư mục chứa các file entity
  synchronize: true, //Đồng bộ với Database
  logging: false, //ghi log
  options: {
    encrypt: false, //True khi chạy trên production
  },
});

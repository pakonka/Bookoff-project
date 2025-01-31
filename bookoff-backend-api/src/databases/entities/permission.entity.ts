import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RolePermission } from "./rolePermission.entity"; // Giả sử bạn có thực thể này

@Entity("permissions")
export class Permission {
  @PrimaryGeneratedColumn()
  permission_id: number;

  @Column({ unique: true })
  permission_name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission_id
  ) // Giả sử bạn có thực thể này
  rolePermissions: RolePermission[];
}

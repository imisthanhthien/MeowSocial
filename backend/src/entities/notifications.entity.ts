import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./users.entity";

@Index("PK__Notifica__3213E83FCE3F7867", ["id"], { unique: true })
@Entity("Notifications", { schema: "dbo" })
export class Notifications {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "type", nullable: true, length: 50 })
  type: string | null;

  @Column("int", { name: "source_id", nullable: true })
  sourceId: number | null;

  @Column("bit", { name: "seen", nullable: true, default: () => "(0)" })
  seen: boolean | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "getdate()",
  })
  createdAt: Date | null;

  // 👤 Người nhận thông báo
  @ManyToOne(() => Users, (users) => users.notifications)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  // 🧍‍♂️ Người thực hiện hành động (like, comment, follow,...)
  @ManyToOne(() => Users)
  @JoinColumn([{ name: "actor_id", referencedColumnName: "id" }])
  actor: Users;
}

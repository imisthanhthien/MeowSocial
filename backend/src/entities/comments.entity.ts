import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./users.entity";
import { Posts } from "./posts.entity";

@Index("PK__Comments__3213E83FF06A483F", ["id"], { unique: true })
@Entity("Comments", { schema: "dbo" })
export class Comments {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "content", nullable: true })
  content: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "getdate()",
  })
  createdAt: Date | null;

  @ManyToOne(() => Users, (users) => users.comments)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Posts, (posts) => posts.comments)
  @JoinColumn([{ name: "post_id", referencedColumnName: "id" }])
  post: Posts;
}

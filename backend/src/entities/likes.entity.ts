import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./users.entity";
import { Posts } from "./posts.entity";

@Index("PK__Likes__3213E83FB18630F5", ["id"], { unique: true })
@Entity("Likes", { schema: "dbo" })
export class Likes {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @ManyToOne(() => Users, (users) => users.likes)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @ManyToOne(() => Posts, (posts) => posts.likes)
  @JoinColumn([{ name: "post_id", referencedColumnName: "id" }])
  post: Posts;
}

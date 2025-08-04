import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./users.entity";

@Index("PK__Follows__3213E83FCE2F5E85", ["id"], { unique: true })
@Entity("Follows", { schema: "dbo" })
export class Follows {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @ManyToOne(() => Users, (users) => users.follows)
  @JoinColumn([{ name: "follower_id", referencedColumnName: "id" }])
  follower: Users;

  @ManyToOne(() => Users, (users) => users.follows2)
  @JoinColumn([{ name: "following_id", referencedColumnName: "id" }])
  following: Users;
}

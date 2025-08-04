import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comments } from "./comments.entity";
import { Follows } from "./follows.entity";
import { Likes } from "./likes.entity";
import { Notifications } from "./notifications.entity";
import { Posts } from "./posts.entity";

@Index("PK__Users__3213E83F83CF26B7", ["id"], { unique: true })
@Index("UQ__Users__AB6E61641BDE83B6", ["email"], { unique: true })
@Entity("Users", { schema: "dbo" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @Column("nvarchar", {
    name: "email",
    nullable: true,
    unique: true,
    length: 100,
  })
  email: string | null;

  @Column("nvarchar", { name: "password", nullable: true, length: 255 })
  password: string | null;

  @Column("nvarchar", { name: "avatar_url", nullable: true })
  avatarUrl: string | null;

  @Column("nvarchar", { name: "bio", nullable: true, length: 255 })
  bio: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "getdate()",
  })
  createdAt: Date | null;

  @OneToMany(() => Comments, (comments) => comments.user)
  comments: Comments[];

  @OneToMany(() => Follows, (follows) => follows.follower)
  follows: Follows[];

  @OneToMany(() => Follows, (follows) => follows.following)
  follows2: Follows[];

  @OneToMany(() => Likes, (likes) => likes.user)
  likes: Likes[];

  @OneToMany(() => Notifications, (notifications) => notifications.user)
  notifications: Notifications[];

  @OneToMany(() => Posts, (posts) => posts.user)
  posts: Posts[];
}

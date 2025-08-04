import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comments } from "./comments.entity";
import { Likes } from "./likes.entity";
import { Users } from "./users.entity";

@Index("PK__Posts__3213E83F31631B69", ["id"], { unique: true })
@Entity("Posts", { schema: "dbo" })
export class Posts {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("nvarchar", { name: "content", nullable: true })
  content: string | null;

  @Column("nvarchar", { name: "image_url", nullable: true })
  imageUrl: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "getdate()",
  })
  createdAt: Date | null;

  @OneToMany(() => Comments, (comments) => comments.post)
  comments: Comments[];

  @OneToMany(() => Likes, (likes) => likes.post)
  likes: Likes[];

  @ManyToOne(() => Users, (users) => users.posts)
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Post } from "../../post/entities/Post.entity";
import { Account } from "../../account/entitities/Account.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id_comment: number;

  @Column("varchar", { length: 1000, nullable: false })
  content: string;

  @Column("datetime", { default: () => "GETDATE()" })
  created_at: Date;

  @Column("datetime", { nullable: true })
  updated_at: Date;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: "post_id" })
  post: Post;

  @ManyToOne(() => Account, (account) => account.comments)
  @JoinColumn({ name: "account_id" })
  account: Account;
}

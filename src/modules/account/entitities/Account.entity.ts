import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { FollowerFollowing } from "../../follower/entitities/Follower.entity";
import { Post } from "../../post/entities/Post.entity";

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id_account: number;

  @Column("varchar", { length: 50, nullable: false, unique: true })
  username: string;

  @Column("varchar", { length: 100, nullable: false })
  password: string;

  @Column("varchar", { length: 500 })
  bio: string;

  @Column("varchar", { length: 100, nullable: true })
  profile_picture: string;

  @Column("tinyint", { default: 0 })
  privacy: number;

  @Column("datetime", { nullable: true })
  last_activity: Date;

  @Column("datetime", { default: () => "GETDATE()" })
  created_at: Date;

  @Column("datetime", { nullable: true })
  updated_at: Date;

  @Column("tinyint", { default: 1 })
  status: number;

  @Column("varchar", { length: 11 })
  phone: string;

  @Column("tinyint", { default: 0 })
  forgot_password: number;

  @OneToMany(() => Post, (post) => post.account)
  posts: Post[];

  @OneToMany(
    () => FollowerFollowing,
    (followerFollowing) => followerFollowing.follower
  )
  followers: FollowerFollowing[];

  @OneToMany(
    () => FollowerFollowing,
    (followerFollowing) => followerFollowing.following
  )
  following: FollowerFollowing[];
}

import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

import { Account } from "../../account/entitities/Account.entity";

@Entity()
export class FollowerFollowing {
  @PrimaryGeneratedColumn()
  id_follower_following: number;

  @ManyToOne(() => Account, (account) => account.followers)
  @JoinColumn({ name: "follower_account_id" })
  follower: Account;

  @ManyToOne(() => Account, (account) => account.following)
  @JoinColumn({ name: "following_account_id" })
  following: Account;
}

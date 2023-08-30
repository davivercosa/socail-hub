import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Account } from "../../account/entitities/Account.entity";

@Entity()
export class Follower {
  @PrimaryGeneratedColumn()
  follower_id: number;

  @ManyToOne(() => Account, (account) => account.followers)
  @JoinColumn({ name: "follower_account_id" })
  followerAccount: Account;

  @ManyToOne(() => Account, (account) => account.following)
  @JoinColumn({ name: "followed_account_id" })
  followedAccount: Account;
}

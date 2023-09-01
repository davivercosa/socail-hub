import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Account } from "../../account/entitities/Account.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id_post: number;

  @Column("varchar", { length: 5000, nullable: false })
  content: string;

  @Column("datetime", { default: () => "GETDATE()" })
  created_at: Date;

  @Column("datetime", { nullable: true })
  updated_at: Date;

  @ManyToOne(() => Account)
  @JoinColumn({ name: "account_id" })
  account: Account;
}

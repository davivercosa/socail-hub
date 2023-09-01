import "reflect-metadata";

import { DataSource } from "typeorm";

import { Account } from "./modules/account/entitities/Account.entity";
import { FollowerFollowing } from "./modules/follower/entitities/Follower.entity";
import { Post } from "./modules/post/entities/Post.entity";

import * as dotenv from "dotenv";
dotenv.config();

const database = process.env.DATABASE;
const password = process.env.DATABASE_PASSWORD;

export const AppDataSource = new DataSource({
  type: "mssql",
  host: "localhost",
  username: "sa",
  password,
  database,
  synchronize: true,
  logging: false,
  entities: [Account, FollowerFollowing, Post],
  migrations: [],
  subscribers: [],
  extra: {
    trustServerCertificate: true,
  },
});

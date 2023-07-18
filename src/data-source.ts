import "reflect-metadata";
import { DataSource } from "typeorm";

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
  entities: [],
  migrations: [],
  subscribers: [],
  extra: {
    trustServerCertificate: true,
  },
});

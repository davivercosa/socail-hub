import express from "express";
import cors from "cors";

import { AppDataSource } from "./data-source";
import { router } from "./routes";

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(express.json());
    app.use("/api/v1", router);
    app.use(
      cors({
        origin: "*",
      })
    );

    app.listen(3000);
  })
  .catch((error) => console.log(error));

import "reflect-metadata";
import express, { Express } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import db from "@config/database";
import routes from "./routes";
import Logger from "./utils/logger";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", routes);

const startServer = async (server: Express) => {
  await db.createConnection();

  server.listen(process.env.NODE_PORT ?? 3001, () => {
    Logger.info(`Escutando na porta: ${process.env.NODE_PORT ?? 3001}`);
  });

  return server;
};

const server = startServer(app);

export default server;

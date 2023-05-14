import "reflect-metadata";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import db from "@config/database";
import routes from "./routes";
import Logger from "./utils/logger";

dotenv.config();

db.createConnection();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", routes);

app.listen(process.env.NODE_PORT, () => {
  Logger.info(`Escutando na porta: ${process.env.NODE_PORT}`);
});

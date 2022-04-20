import "reflect-metadata";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import DBConnection from "@config/DBConnection";
import routes from "./routes";
import Logger from "./utils/Logger";

dotenv.config();

DBConnection.createConnection();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.NODE_PORT, () => {
  Logger.info(`Escutando na porta: ${process.env.NODE_PORT}`);
});

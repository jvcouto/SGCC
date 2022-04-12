import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import dataSource from '@config/dbConfig';
import routes from './routes';
import Logger from './utils/logger';

dotenv.config();

dataSource.initialize().then(() => {
  Logger.info('Orm connection initialized!');
}).catch((err) => {
  Logger.info(`Error during Data orm initialization: ${err}`);
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  Logger.info('Escutando na porta: 3000');
});

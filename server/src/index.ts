import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import '@config/dbConnection';
import routes from './routes';
import Logger from './utils/Logger';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  Logger.info('Escutando na porta: 3000');
});

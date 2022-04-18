import { createConnection } from 'typeorm';
import Logger from '@utils/Logger';

createConnection().then(() => Logger.info('TypeORM initialized!!')).catch((err) => Logger.error(err));

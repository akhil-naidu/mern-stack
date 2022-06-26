import 'dotenv/config';
import log4js from 'log4js';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import UserRouter from './routes/user.js';

const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;

log4js.configure({
  appenders: {
    app: { type: 'file', filename: 'app.log' },
    out: { type: 'stdout' },
  },
  categories: {
    default: { appenders: ['app', 'out'], level: `${process.env.LOG_LEVEL}` },
  },
});

const logger = log4js.getLogger('In Index File');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', UserRouter);

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.fatal(`Connection to mongodb failed with error ${error.message}`);
  });

import * as dotenv from 'dotenv';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import bodyParser from 'body-parser';

import router from './src/routes';
import { Exception } from './src/typings/interfaces';
import protect from './src/middlewares/auth.middleware';
dotenv.config();
const { SERVER_PORT } = process.env;

const processId = process.pid;
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.json({
    limit: '50mb',
  }),
);
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  }),
);

app.use((req: any, res: Response, next: NextFunction) => protect(req, res, next));

app.use('/api/', router);

app.use((error: Exception, _req: Request, res: Response, next: NextFunction) => {
  const { message, status } = error;
  if (status && status < 500) {
    return res.status(status).json({ message });
  }
  return res.status(500).json({ message: 'Something broke!' });
});

app.listen(SERVER_PORT, async () => {
  console.log(`Running on http://localhost:${SERVER_PORT} with pid: ${processId}`);
});

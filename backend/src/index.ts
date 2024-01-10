import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express, { Express, Request, Response, NextFunction } from 'express';
import { NODE_ENV, PORT } from './config';
import morgan from 'morgan';
import { IError } from './interfaces/error.interface';
import { NOT_FOUND, SERVER_ERROR } from './errors';

const app: Express = express();

// -------------- Mounting Middlewares ---------------
app.use(express.json());
/*
    express.json() is a built-in middleware in Express
    to parse incoming requests with JSON payloads, it is
    based on body-parser.
*/

if (NODE_ENV === 'development') app.use(morgan('dev'));

// ---------------- Error Handling --------------------
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  const error: IError = {
    status: 404,
    message: NOT_FOUND
  };

  next(error);
});

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || SERVER_ERROR;

  res.status(status).json({
    type: 'error',
    message
  });

  next();
});
// -------------- Error Handling Ends -----------------

// --------------------- Routes -----------------------
app.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({
    type: 'success',
    message: 'Pong 🏓'
  });
});

async function main() {
  try {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();

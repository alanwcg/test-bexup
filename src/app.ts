import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate'
import { AppError } from './errors/AppError';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);
app.use(errors());
app.use((error: Error, request: Request, response: Response, _:NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      error: error.name,
      message: error.message,
    });
  }

  response.status(500).json({
    error: 'Error',
    message: 'Internal server error.'
  });
})

app.listen(3333, () => console.log('Server started on port 3333.'));

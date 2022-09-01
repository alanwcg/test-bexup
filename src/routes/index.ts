import { Router } from 'express';
import { productsRouter } from './products.routes';

export const router = Router();

router.use('/products', productsRouter);
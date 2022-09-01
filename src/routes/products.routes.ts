import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate'
import { CreateProductController } from '../services/products/create/CreateProductController';
import { FindProductsController } from '../services/products/find/FindProductsController';

export const productsRouter = Router();
const createProductController = new CreateProductController();
const findProductsController = new FindProductsController();

productsRouter.post('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string().min(3).required(),
  }
}), createProductController.handle);

productsRouter.get('/', celebrate({
  [Segments.QUERY]: {
    name: Joi.string().min(3).allow(''),
  }
}), findProductsController.handle);

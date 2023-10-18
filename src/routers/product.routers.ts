import { Router } from 'express';
import productController from '../controllers/product.controller';
import Joi from '../middleware/joi';

const productsRouters = Router();

productsRouters.get('/products', productController.list);
productsRouters.post('/products', Joi.validations, productController.create);

export default productsRouters;
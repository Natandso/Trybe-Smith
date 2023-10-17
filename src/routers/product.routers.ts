import { Router } from 'express';
import productController from '../controllers/product.controller';

const productsRouters = Router();

productsRouters.get('/products', productController.list);
productsRouters.post('/products', productController.create);

export default productsRouters;
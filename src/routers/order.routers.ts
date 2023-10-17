import { Router } from 'express';
import orderController from '../controllers/order.controller';

const ordersRouters = Router();

ordersRouters.get('/orders', orderController.list);

export default ordersRouters;
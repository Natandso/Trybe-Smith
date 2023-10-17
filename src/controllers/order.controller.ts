import { Request, Response } from 'express';
import orderService from '../services/order.service';

async function list(req:Request, res: Response) {
  const response = await orderService.allOrders();

  return res.status(200).json(response);
}

export default {
  list,
};
import { Request, Response } from 'express';
import productService from '../services/product.service';

async function create(req: Request, res:Response) {
  const { name, price, orderId } = req.body;
  const registerProducts = await productService.create({ name, price, orderId });

  res.status(201).json(registerProducts);
}

async function list(req: Request, res: Response) {
  const response = await productService.getAll();

  return res.status(200).json(response);
}

export default {
  create,
  list,
};
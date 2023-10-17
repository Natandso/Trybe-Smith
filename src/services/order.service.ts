import { OrderResponse } from '../types/orderResponse';
import OrderModel from '../database/models/order.model';
import ProductModel from '../database/models/product.model';

async function allOrders(): Promise<OrderResponse[]> {
  const orders = await OrderModel.findAll({
    include: [
      {
        model: ProductModel, 
        as: 'productIds',
        attributes: ['id'],
      },
    ],
  });
  const values = orders.map((order) => order.dataValues);
  const formatOrders = values.map((order) => ({
    id: order.id,
    userId: order.userId,
    productIds: order.productIds?.map((product) => product.id),
  }));
  return formatOrders;
}

export default {
  allOrders,
};
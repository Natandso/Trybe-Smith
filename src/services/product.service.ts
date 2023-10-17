import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';

async function create(
  products: ProductInputtableTypes,
): Promise<ProductInputtableTypes> {
  const newRegister = await ProductModel.create(products);

  return newRegister.dataValues;
}

export default {
  create,
};
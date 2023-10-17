import ProductModel, { ProductInputtableTypes,
  ProductSequelizeModel } from '../database/models/product.model';

async function create(
  products: ProductInputtableTypes,
): Promise<ProductInputtableTypes> {
  const newRegister = await ProductModel.create(products);

  return newRegister.dataValues;
}

async function getAll(): Promise<ProductSequelizeModel[]> {
  const gettingOurProducts = await ProductModel.findAll();

  return gettingOurProducts;
}

export default {
  create,
  getAll,
};
import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import productMock from '../../mocks/productMock.';
import ProductModel from '../../../src/database/models/product.model';
import app from '../../../src/app'
import productService from '../../../src/services/product.service';
chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('verify if its possible to get all legendary weapons on the db', async function () {
    // Arrange
    const product = {
      id: 1,
      name: 'BloodThirst Dagger',
      price: '1000',
      orderId: 1,
    };
    sinon.stub(ProductModel, 'findAll').resolves(product as any);

    // Act
    const httpResponse = await chai
    .request(app)
    .get('/products')
    .send(product);

    // Assert
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(product);
  });
});

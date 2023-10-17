import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';
import productMock from '../../mocks/productMock.';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('verify if its possible to register your new weapon legendary', async function () {
    // Arrange
    const mockCreateReturn = ProductModel.build(productMock.validRegister);
    sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);

    // Act
    const httpResponse = await chai
    .request(app)
    .post('/products')
    .send(productMock.validRegister);

    // Assert
    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.deep.equal(productMock.validRegister);
  });
});

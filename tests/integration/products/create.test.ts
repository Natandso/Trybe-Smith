import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';
import productMock from '../../mocks/productMock.';
import validations from '../../../src/middleware/joi';

chai.use(chaiHttp);

describe('POST /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('verify if its possible to register your new weapon legendary', async function () {
    // Arrange
    const mockCreateReturn = ProductModel.build(productMock.validRegisterWithId);
    sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);

    // Act
    const httpResponse = await chai
    .request(app)
    .post('/products')
    .send(productMock.validRegister);
    

    // Assert
    expect(httpResponse).to.have.status(201)
    expect(httpResponse.body).to.deep.equal(productMock.validRegisterWithId);
  });

  it('should return the status 400 when name was not placed ', async function () {
const response = await chai.request(app).post('/products').send(productMock.invalidPost)

expect(response).to.have.status(400)
expect((response).body).to.be.deep.eq({
  message: '"name" is required'
})

  });
      it('Deve retornar erro 400 para campos em falta', (done) => {
        chai.request(app)
          .post('/products')
          .send({ price: '10.00' })
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body).to.have.property('message').to.include('"name" is required');
            done();
          });
      });
    
      it('Deve retornar erro 422 para campos com dados inválidos', (done) => {
        chai.request(app)
          .post('/products')
          .send({ name: 'P', price: '10.00' })
          .end((err, res) => {
            expect(res).to.have.status(422);
            expect(res.body).to.have.property('message').to.include('"name" length must be at least 3 characters long');
            done();
          });
      });
});

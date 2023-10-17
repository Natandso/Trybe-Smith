import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import orderController from '../../../src/controllers/order.controller'
import orderService from '../../../src/services/order.service';

chai.use(sinonChai);



describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('should return all orders', async function () {
    // Arrange
    sinon.stub(orderService, 'allOrders').resolves([
      { id: 1, userId: 1, productIds: [1,2]},
      { id: 2, userId: 2, productIds: [3,4] },
    ]);

    // Act
   res.status = sinon.stub().returnsThis();
   res.json = sinon.stub().returnsThis();


   await orderController.list(req, res);
    // Assert
    expect(res.status).to.have.been.calledWith(200)
    expect(res.json).to.have.been.calledWith([
      { id: 1, userId: 1, productIds: [1,2]},
      { id: 2, userId: 2, productIds: [3,4] },
    ])

  });

});

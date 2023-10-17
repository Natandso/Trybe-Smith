import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import bcrypt from 'bcryptjs';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('should return status 400 if you put a username or password invalid', async function () {
   const httpResponse = await chai.request(app).post('/login');

   expect(httpResponse).to.have.status(400);
   expect(httpResponse.body).to.be.deep.eq({
    message: '"username" and "password" are required'
   })

  })

  it('should return status 401 if you put a username or password invalid', async function () {
    const userLogin = UserModel.build({
      id: 1,
      username: 'Hagarr',
      password: '1223456',
      level: 1,
      vocation: 'knight'
    })
 
    sinon.stub(UserModel, 'findOne').resolves(userLogin)
  sinon.stub(bcrypt, 'compareSync').returns(false);
  
  const response = await chai
  .request(app)
  .post('/login')
  .send({ username: 'Hagarr', password: 'incorrect' })
  
  expect(response.status).to.be.eq(401)
  expect(response.body).to.be.deep.eq({
    message: 'Username or password invalid'
  })
  })
});

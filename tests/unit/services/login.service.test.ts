import { expect } from 'chai';
import sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';
import loginService from '../../../src/services/login.service';
import { Login } from '../../../src/types/Login';
import { Token } from '../../../src/types/Token';
import jwtUtil from '../../../src/utils/jwt.util';
import bcrypt from 'bcryptjs';

describe('LoginService', function () {
  beforeEach(function () { sinon.restore(); });
  it('must return our token when login is valid', async function () {
    const usernameMock = 'hagar';
    const passwordMock = '123456';
    const userMock = UserModel.build({
      id: 1,
      username: usernameMock,
      password: bcrypt.hashSync(passwordMock, 10),
      vocation: 'knight',
      level: 100,
    });

    const findOneStub = sinon.stub(UserModel, 'findOne').resolves(userMock);
    const compareSyncStub = sinon.stub(bcrypt, 'compareSync').returns(true);
    const signStub = sinon.stub().returns('token');
    sinon.stub(jwtUtil, 'sign').value(signStub);

    const login: Login = { username: usernameMock, password: passwordMock };
    const result = await loginService.verifyLogin(login);

    expect(result).to.be.an('object');
    expect(result).to.have.property('status', 'SUCCESSFUL');
    expect(result).to.have.property('data');
    expect(result.data).to.have.property('token', 'token');

    expect(findOneStub.calledOnce).to.be.true;
    expect(compareSyncStub.calledOnce).to.be.true;
    expect(signStub.calledOnce).to.be.true;
  });


  it('must return status 401 when login is invalid', async function () {
    const usernameMock = 'hagar';
    const passwordMock = '123456';
    const userMock = UserModel.build({
      id: 1,
      username: usernameMock,
      password: bcrypt.hashSync(passwordMock, 10),
      vocation: 'knight',
      level: 100,
    });

    const findOneStub = sinon.stub(UserModel, 'findOne').resolves(userMock);
    const compareSyncStub = sinon.stub(bcrypt, 'compareSync').returns(false);
    const login: Login = { username: usernameMock, password: passwordMock };
    const result = await loginService.verifyLogin(login);

    expect(result).to.be.an('object');
    expect(result).to.have.property('status', 'UNAUTHORIZED');
    expect(result).to.have.property('data');
    expect(result.data).to.have.property('message', 'Username or password invalid');
    expect(findOneStub.calledOnce).to.be.true;
    expect(compareSyncStub.calledOnce).to.be.true;
  });

  it('must return status error 401 when  username or password do not informed', async function () {
    const login: Login = { username: '', password: ''};
    const result = await loginService.verifyLogin(login);

    expect(result).to.have.property('data');
    expect(result.data).to.have.property('message', '"username" and "password" are required');
    expect(result).to.have.property('status', 'INVALID_DATA');
    expect(result).to.be.an('object');
  });


});
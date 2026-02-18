import { expect } from 'chai';
import sinon from 'sinon'; 
import * as authController from '../../../src/controllers/controllers.auth.js';

describe('', () => {
  let status,
    next;

  const res = {
    status: 'error',
    error: 'INTERNAL_SERVER_ERROR',
    code: 500
  };

  beforeEach(() => {
    status = sinon.stub();
    next = sinon.stub();
    status.returns(res);
    next.returns(res);
  }); 
});
describe('User Auth controller catch block unit testings', () => {
      it('should call register', async() => {
      const req = { body: '' };
      const data = await authController.register(req, res, next);
      expect(data.code).to.equal('500');
      expect(data.error).to.equal('INTERNAL_SERVER_ERROR');
    }); 
}) 
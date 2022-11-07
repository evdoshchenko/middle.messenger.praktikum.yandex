import { XHRFetch } from './XHRFetch';

const USER_MOCK = {
  login: 'correctlogin',
  password: 'correctPassw0rd',
};

describe('HTTPTransport', () => {
  it('should perform POST request', async () => {
    const result = await XHRFetch
      .post('/auth/signin', { data: USER_MOCK });
    expect(result).toEqual('OK');
  });
});

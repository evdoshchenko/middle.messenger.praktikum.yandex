import { XHRFetch } from 'helpers';
import { optionsFetch as options } from 'api';

type LoginRequestData = {
  login: string;
  password: string;
};

type SignupRequestInput = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export const authAPI = {
  login:
    (data: LoginRequestData) => XHRFetch
      .post('/auth/signin', { ...options, data }),

  signup:
    (data: SignupRequestInput) => XHRFetch
      .post('/auth/signup', { ...options, data }),

  me:
    () => XHRFetch
      .get('/auth/user'),

  logout:
    () => XHRFetch
      .post('/auth/logout'),
};

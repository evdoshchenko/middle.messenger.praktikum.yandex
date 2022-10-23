import XHRFetch from 'helpers/XHRFetch';
import { optionsFetch as options } from './types';

type LoginRequestData = {
  login: string;
  password: string;
};

export const authAPI = {
  login:
    (data: LoginRequestData) => XHRFetch
      .post('/auth/signin', { ...options, data }),

  signup:
    (data: LoginRequestData) => XHRFetch
      .post('/auth/signup', { ...options, data }),

  me:
    () => XHRFetch
      .get('/auth/user'),

  logout:
    () => XHRFetch
      .post('/auth/logout'),
};

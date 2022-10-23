import XHRFetch from 'helpers/XHRFetch';
import { optionsFetch as options } from './types';

type UserRequestData = {
  first_name?: string;
  second_name?: string;
  display_name?: string;
  login?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  id?: number;
};

type PasswordRequestData = {
  oldPassword: string;
  newPassword: string;
};

export const userAPI = {
  edit:
    (data: UserRequestData) => XHRFetch
      .put('/user/profile', { ...options, data }),

  editpassword:
    (data: PasswordRequestData) => XHRFetch
      .put('/user/password', { ...options, data }),

  editavatar:
    (data: UserRequestData) => XHRFetch
      .put('/user/profile/avatar', { ...options, data }),
};

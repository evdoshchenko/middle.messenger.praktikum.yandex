import { XHRFetch } from 'helpers';
import { optionsFetch as options } from 'api';

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

  editPassword:
    (data: PasswordRequestData) => XHRFetch
      .put('/user/password', { ...options, data }),

  editAvatar:
    (data: UserRequestData) => XHRFetch
      .put('/user/profile/avatar', { ...options, data }),
};

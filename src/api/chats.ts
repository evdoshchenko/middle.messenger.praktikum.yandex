import XHRFetch from 'helpers/XHRFetch';
import { optionsFetch as options } from './types';

type AddUserRequestData = {
  users: Array<string>;
  chatId: string;
};

type NewChatRequestData = {
  title: string;
};

export const chatsAPI = {
  me:
    () => XHRFetch
      .get('/chats'),

  newchat:
    (data: NewChatRequestData) => XHRFetch
      .post('/chats', { ...options, data }),

  getusers:
    (data: string) => XHRFetch
      .get(`/chats/${data}/users`),

  adduser:
    (data: AddUserRequestData) => XHRFetch
      .put('/chats/users', { ...options, data }),

  deleteuser:
    (data: AddUserRequestData) => XHRFetch
      .delete('/chats/users', { ...options, data }),
};

import { XHRFetch } from 'helpers';
import { optionsFetch as options } from 'api';

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

  newChat:
    (data: NewChatRequestData) => XHRFetch
      .post('/chats', { ...options, data }),

  getUsers:
    (data: string) => XHRFetch
      .get(`/chats/${data}/users`),

  addUser:
    (data: AddUserRequestData) => XHRFetch
      .put('/chats/users', { ...options, data }),

  deleteUser:
    (data: AddUserRequestData) => XHRFetch
      .delete('/chats/users', { ...options, data }),
};

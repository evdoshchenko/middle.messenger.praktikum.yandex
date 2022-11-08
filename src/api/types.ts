export type APIError = {
  reason: string;
};

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type ChatsDTO = {
  id: number;
  title: string;
  avatar: string;
  unread_count: string;
  last_message: {
    first_name: string;
    second_name: string;
    avatar: string;
    email: string;
    display_name: string;
    login: string;
    phone: string;
    content: string;
  }
  time: string;
};

export type MessageViewDTO = {
  id: number;
  chat_id?: number;
  content: string;
  is_read?: boolean;
  time: string;
  type: string;
  user_id: string;
};

export const optionsFetch = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

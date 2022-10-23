import { UserDTO, ChatsDTO } from 'api/types';

export const transformUser = (data: UserDTO): User => {
  return {
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
  };
};

export const transformChats = (data: ChatsDTO): Chats => {
  return {
    id: data.id,
    title: data.title,
    avatar: data.avatar,
    unread_count: data.unread_count,
    last_message: data.last_message,
    time: data.time,
    content: data.content,
  };
};

export const transformActiveChat = (data: any): any => {
  return {
    id: data[0].id,
    title: data[0].title,
    avatar: `${process.env.API_ENDPOINT}/resources${data[0].avatar}`,
  };
};

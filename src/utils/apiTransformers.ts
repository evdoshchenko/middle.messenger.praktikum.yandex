import { UserDTO, ChatsDTO } from 'api';

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

export const transformChats = (data: ChatsDTO): ChatsType => {
  return {
    id: data.id,
    title: data.title,
    avatar: data.avatar,
    unreadCount: data.unread_count,
    lastMessage: data.last_message,
    time: data.time,
  };
};

export const transformActiveChat = (data: any): any => {
  return {
    id: data[0].id,
    title: data[0].title,
  };
};

export const transformMessageView = (data: any) => {
  return {
    id: data.id,
    chatId: data.chat_id,
    content: data.content,
    isRead: data.is_read,
    time: new Date(data.time),
    type: data.type,
    userId: data.user_id,
  };
};

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type Indexed = { [key: string]: any };

  export type AppState = {
    appIsInited: boolean;
    screen: Screens | null;
    isLoading: boolean;
    loginFormError: string | null;
    user: User | null;
    chats: Chats | null;
    activeChat: { id?: string | null, title?: string | null, avatar?: string | null } | null;
    users: Users | null;
    messages: any | null,
    message: string | null,
    ws: Nullable<WebSocket>,
  };

  export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
  };

  export type Users = Array<User>;

  export type ChatsType = {
    id: number,
    title: string,
    avatar: string,
    unreadCount: string,
    lastMessage?: {
      content?: string | null,
    },
    time: string,
  };

  export type MessageView = {
    id: number;
    userId: string;
    chatId?: number;
    content: string;
    isRead?: boolean;
    time: Date;
    type: string;
    file: Nullable<File>;
  };
}

export {};

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

  export type Chats = {
    id: number,
    title: string,
    avatar: string,
    unread_count: string,
    last_message: {},
    time: string,
    content: string,
  };
}

export {};

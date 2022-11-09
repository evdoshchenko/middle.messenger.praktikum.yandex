import { chatsAPI, ChatsDTO } from 'api';
import type { Dispatch } from 'core';
import { transformChats, apiHasError } from 'utils';

type AddUserPayload = {
  users: Array<string>;
  chatId: string;
};

type NewChatPayload = {
  title: string;
};

export const me = async (
  dispatch: Dispatch<AppState>,
) => {
  dispatch({ isLoading: true });

  const responseChats = await chatsAPI.me();

  dispatch({ isLoading: false, loginFormError: null, chats: transformChats(responseChats as ChatsDTO) });
};

export const addUser = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: AddUserPayload,
) => {
  const response = await chatsAPI.addUser(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
  }
};

export const deleteUser = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: AddUserPayload,
) => {
  const response = await chatsAPI.deleteUser(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
  }
};

export const createNewChat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: NewChatPayload,
) => {
  dispatch({ isLoading: true });

  const response = await chatsAPI.newChat(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
  }

  const responseChats:any = await chatsAPI.me();

  if (apiHasError(responseChats)) {
    dispatch({ isLoading: false });
    return;
  }
  dispatch({ chats: responseChats, isLoading: false });
};

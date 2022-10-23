import { chatsAPI } from 'api/chats';
import { ChatsDTO } from 'api/types';
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

export const adduser = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: AddUserPayload,
) => {
  dispatch({ isLoading: true });

  const response = await chatsAPI.adduser(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }
  dispatch({ isLoading: false });
};

export const deleteuser = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: AddUserPayload,
) => {
  dispatch({ isLoading: true });

  const response = await chatsAPI.deleteuser(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }
  dispatch({ isLoading: false });
};

export const newchat = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: NewChatPayload,
) => {
  dispatch({ isLoading: true });

  const response = await chatsAPI.newchat(action);

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

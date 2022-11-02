import { chatsAPI } from 'api';
import type { Dispatch } from 'core';
import { apiHasError, transformActiveChat } from 'utils';

export async function initChats(dispatch: Dispatch<AppState>) {
  await new Promise((r) => setTimeout(r, 700));
  try {
    const response:any = await chatsAPI.me();

    if (apiHasError(response)) {
      return;
    }

    dispatch({ chats: response, activeChat: transformActiveChat(response) });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}

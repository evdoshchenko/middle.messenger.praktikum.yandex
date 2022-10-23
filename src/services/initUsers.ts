import { chatsAPI } from 'api/chats';
import type { Dispatch } from 'core';
import { apiHasError } from 'utils';

export async function initUsers(dispatch: Dispatch<AppState>) {
  await new Promise((r) => setTimeout(r, 700));

  try {
    const response:any = await chatsAPI.getusers('420');

    if (apiHasError(response)) {
      return;
    }

    dispatch({ users: response });
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ appIsInited: true });
  }
}

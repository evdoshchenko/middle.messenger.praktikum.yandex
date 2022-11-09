import { authAPI, UserDTO } from 'api';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'utils';
import { initChats } from 'services';

export async function initApp(dispatch: Dispatch<AppState>) {
  await new Promise((r) => setTimeout(r, 700));

  try {
    const response = await authAPI.me();

    if (apiHasError(response)) {
      return;
    }

    dispatch({ user: transformUser(response as UserDTO) });
    dispatch(initChats);
  } catch (err) {
    console.error('User is not authorized', err);
    dispatch({ appIsInited: true });
  }
}

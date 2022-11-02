import { userAPI, authAPI, UserDTO } from 'api';
import { logout } from 'services';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'utils';

type UserPayload = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

type PasswordPayload = {
  oldPassword: string;
  newPassword: string;
};

export const edit = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: UserPayload,
) => {
  dispatch({ isLoading: true });

  const response = await userAPI.edit(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.me();

  dispatch({ isLoading: false, loginFormError: null });

  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ isLoading: false, user: transformUser(responseUser as UserDTO) });
};

export const editAvatar = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: UserPayload,
) => {
  dispatch({ isLoading: true });

  const response = await userAPI.editAvatar(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.me();

  dispatch({ isLoading: false, loginFormError: null });

  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ isLoading: false, user: transformUser(responseUser as UserDTO) });
};

export const editPassword = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: PasswordPayload,
) => {
  dispatch({ isLoading: true });

  const response = await userAPI.editPassword(action);

  if (apiHasError(response)) {
    dispatch({ isLoading: false, loginFormError: response.reason });
    return;
  }

  const responseUser = await authAPI.me();

  dispatch({ isLoading: false, loginFormError: null });

  if (apiHasError(response)) {
    dispatch(logout);
    return;
  }

  dispatch({ isLoading: false, user: transformUser(responseUser as UserDTO) });
};

import { authAPI, UserDTO } from 'api';
import type { Dispatch } from 'core';
import { transformUser, apiHasError } from 'utils';

type LoginPayload = {
  login: string;
  password: string;
};

type SignupPayload = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export const logout = async (dispatch: Dispatch<AppState>) => {
  dispatch({ isLoading: true });

  await authAPI.logout();

  dispatch({ isLoading: false, user: null });

  window.router.go('/sign-in');
};

export const login = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: LoginPayload,
) => {
  dispatch({ isLoading: true });

  const response = await authAPI.login(action);

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

  dispatch({ user: transformUser(responseUser as UserDTO) });

  window.router.go('/messenger');
};

export const signup = async (
  dispatch: Dispatch<AppState>,
  state: AppState,
  action: SignupPayload,
) => {
  dispatch({ isLoading: true });

  const response = await authAPI.signup(action);

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

  dispatch({ user: transformUser(responseUser as UserDTO) });

  window.router.go('/messenger');
};

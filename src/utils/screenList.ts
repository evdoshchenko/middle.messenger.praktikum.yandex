import { BlockClass } from 'core';
import SignInPage from 'pages/signin';
import SignUpPage from 'pages/signup';
import Error404Page from 'pages/error404';
import Error5xxPage from 'pages/error5xx';
import ProfilePage from 'pages/profile';
import PasswordPage from 'pages/password';
import MessengerPage from 'pages/messenger';

export enum Screens {
  SignIn = 'signin',
  SignUp = 'signup',
  Error404 = 'error404',
  Error5xx = 'error5xx',
  Profile = 'profile',
  Password = 'password',
  Messenger = 'messenger',
}

const map: Record<Screens, BlockClass<any>> = {
  [Screens.SignIn]: SignInPage,
  [Screens.SignUp]: SignUpPage,
  [Screens.Error404]: Error404Page,
  [Screens.Error5xx]: Error5xxPage,
  [Screens.Profile]: ProfilePage,
  [Screens.Password]: PasswordPage,
  [Screens.Messenger]: MessengerPage,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => map[screen];

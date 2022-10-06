import { Block, renderDOM, registerComponent } from 'core';
import { components } from 'components';
import XHRFetch from 'helpers/XHRFetch';

import SigninPage from 'pages/signin';
import SignupPage from 'pages/signup';
import Error404Page from 'pages/error404';
import Error5xxPage from 'pages/error5xx';
import ProfilePage, { ProfileEditPage, ProfileEditPassPage } from 'pages/profile';
import MessengerPage from 'pages/messenger';

import Link from 'components/link';

import './styles/index.scss';

require('babel-core/register');

components.forEach((component) => {
  registerComponent(component);
});

type Refs = {
  linkRef: Link;
};

class Onboarding extends Block<{}, Refs> {
  constructor() {
    super();
    this.setProps({
      goToSigninPage: (e: FocusEvent) => {
        e.preventDefault();
        renderDOM(new SigninPage());
      },
      goToSignupPage: (e: FocusEvent) => {
        e.preventDefault();
        renderDOM(new SignupPage());
      },
      goToError404Page: (e: FocusEvent) => {
        e.preventDefault();
        renderDOM(new Error404Page());
      },
      goToError5xxPage: (e: FocusEvent) => {
        e.preventDefault();
        renderDOM(new Error5xxPage());
      },
      goToProfilePage: (e: FocusEvent) => {
        e.preventDefault();
        renderDOM(new ProfilePage());
      },
      goToProfileEditPage: (e: FocusEvent) => {
        e.preventDefault();
        renderDOM(new ProfileEditPage());
      },
      goToProfileEditPassPage: (e: FocusEvent) => {
        e.preventDefault();
        renderDOM(new ProfileEditPassPage());
      },
      goToMessengerPage: (e: FocusEvent) => {
        e.preventDefault();
        renderDOM(new MessengerPage());
      },
      onLink: (e: FocusEvent) => {
        e.preventDefault();
        const nextValue = String(Number(this.refs.linkRef.getProps().text) + 1);
        this.refs.linkRef.setProps({ text: nextValue });

        XHRFetch.get(`https://jsonplaceholder.typicode.com/todos/${nextValue}`)
          .then((data) => {
            console.log((data as XMLHttpRequest).response);
          });
      },
    });
  }

  render() {
    return `
      <div class="form__wrapper">
        <div class="form form-signup">

          <div class="form__top">
            {{{Title text="Pages:"}}}
            {{{Subtitle text="Reload this page to go back"}}}
          </div>
          
          <div class="form__bottom">
            {{{Button text="Sign in" link="/signin" onClick=goToSigninPage}}}
            {{{Button text="Sign up" link="/signup" onClick=goToSignupPage}}}
            {{{Button text="Error404" link="/error404" onClick=goToError404Page}}}
            {{{Button text="Error5XX" link="/error5xx" onClick=goToError5xxPage}}}
            {{{Button text="Profile" link="/profile" onClick=goToProfilePage}}}
            {{{Button text="Profile Edit" link="/profile" onClick=goToProfileEditPage}}}
            {{{Button text="Profile Edit Password" link="/profile" onClick=goToProfileEditPassPage}}}
            {{{Button text="Messenger" link="/messeger" onClick=goToMessengerPage}}}
            {{{Button ref="linkRef" text="1" link="/signup" onClick=onLink}}}
          </div>

        </div>
      </div>  
      `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new Onboarding());
  // renderDOM(new SigninPage());
  // renderDOM(new SignupPage());
  // renderDOM(new ProfilePage());
  // renderDOM(new MessengerPage());
});

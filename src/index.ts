import {
  renderDOM, registerComponent, PathRouter, CoreRouter, Store,
} from 'core';
import { components } from 'components';
import { SplashPage } from 'pages/splash';
import { initApp } from 'services';
import { initRouter } from './router';
import { defaultState } from './store';

import './styles/index.scss';

import 'regenerator-runtime/runtime';

components.forEach((component) => {
  registerComponent(component);
});

declare global {
  interface Window {
    store: Store<AppState>;
    router: CoreRouter;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store<AppState>(defaultState);
  const router = new PathRouter();

  window.router = router;
  window.store = store;

  renderDOM(new SplashPage({}));

  store.on('changed', (prevState, nextState) => {
    if (!process.env.DEBUG) {
      console.log(
        '%cstore updated',
        'background: #222; color: #bada55',
        nextState,
      );
    }
  });

  initRouter(router, store);

  store.dispatch({ isLoading: true });
  store.dispatch(initApp);
  store.dispatch({ isLoading: false });
});

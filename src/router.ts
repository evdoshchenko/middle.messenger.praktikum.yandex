import { Store, renderDOM, CoreRouter } from 'core';
import { getScreenComponent, Screens } from 'utils';

const routes = [
  {
    path: '/',
    block: Screens.Messenger,
    shouldAuthorized: true,
  },
  {
    path: '/sign-in',
    block: Screens.SignIn,
    shouldAuthorized: false,
  },
  {
    path: '/sign-up',
    block: Screens.SignUp,
    shouldAuthorized: false,
  },
  {
    path: '/error404',
    block: Screens.Error404,
    shouldAuthorized: false,
  },
  {
    path: '/error5xx',
    block: Screens.Error5xx,
    shouldAuthorized: true,
  },
  {
    path: '/profile',
    block: Screens.Profile,
    shouldAuthorized: true,
  },
  {
    path: '/password',
    block: Screens.Password,
    shouldAuthorized: true,
  },
  {
    path: '/messenger',
    block: Screens.Messenger,
    shouldAuthorized: true,
  },
  {
    path: '*',
    block: Screens.Error404,
    shouldAuthorized: false,
  },
];

export function initRouter(router: CoreRouter, store: Store<AppState>) {
  routes.forEach((route) => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user);
      const currentScreen = Boolean(store.getState().screen);

      if (isAuthorized || !route.shouldAuthorized) {
        store.dispatch({ screen: route.block });
        return;
      }

      if (!currentScreen) {
        store.dispatch({ screen: Screens.SignIn });
      }
    });
  });

  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }

    if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen);
      renderDOM(new Page({}));
      const name = Page.componentName;
      if (name) {
        document.title = `Heylynx – ${name.slice(0, (name.length - 4))}`;
      }
    }
  });
}

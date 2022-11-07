// import { HashRouter } from 'core';
import { PathRouter } from 'core';

// export class MockedHashRouter extends HashRouter {
export class MockedPathRouter extends PathRouter {
  go(pathname: string) {
    window.history.pushState({}, '', pathname);
    // window.location.hash = hash;
    this.onRouteChange();
  }
}

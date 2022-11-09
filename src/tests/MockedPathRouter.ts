import { PathRouter } from 'core';

export class MockedPathRouter extends PathRouter {
  go(pathname: string) {
    window.history.pushState({}, '', pathname);
    this.onRouteChange();
  }
}

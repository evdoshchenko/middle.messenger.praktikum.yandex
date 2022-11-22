import {
  BlockClass, renderDOM, registerComponent, Store,
} from 'core';
import { defaultState } from 'store';
import { components } from 'components';

import { MockedPathRouter } from 'tests';
import { sleep } from 'utils';
import { initRouter } from '../router';

type RenderBlockParams<T> = {
  Block: BlockClass<T>;
  props: T | undefined;
  state?: Partial<AppState>;
};

export async function renderBlock<T extends Object>({ Block, props, state = defaultState }: RenderBlockParams<T>) {
  components.forEach((Component: any) => {
    registerComponent(Component);
  });

  const store = new Store<AppState>({ ...defaultState, ...state });
  const router = new MockedPathRouter();

  window.router = router;
  window.store = store;

  document.body.innerHTML = '<div id="app"></div>';

  renderDOM(new Block(props as T));

  initRouter(router, store);

  await sleep();
}

export async function step(name: string, callback: () => void) {
  await callback();
}

import { Block, CoreRouter } from 'core';
import { withIsLoading, withRouter } from 'utils';

import './layout.scss';

type LayoutProps = {
  router: CoreRouter;
  isLoading: boolean;
  fullScreen?: boolean;
  splash?: boolean;
  onNavigateToOnboarding?: () => void;
};

class Layout extends Block<LayoutProps> {
  static componentName = 'Layout';

  constructor(props: LayoutProps) {
    super(props);

    this.setProps({
      onNavigateToOnboarding: () => this.props.router.go('/signin'),
    });
  }

  protected render(): string {
    return `
      <div class="layout__wrapper {{#if splash}} screen_type_splash{{/if}}{{#if fullScreen}} screen_theme_full{{/if}}{{#if isLoading}} screen_loading{{/if}}">
        <div class="layout" data-layout=1></div>
      </div>
    `;
  }
}

const ComposedLayout = withRouter(withIsLoading(Layout));

export { ComposedLayout as Layout };

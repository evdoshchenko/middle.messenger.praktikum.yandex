import Block from 'core/Block';

import './layout.scss';

type LayoutProps = {};

export class Layout extends Block<LayoutProps> {
  static componentName = 'Layout';

  protected render(): string {
    return `
      <div class="form__wrapper">
        <div class="screen__content" data-slot=1></div>
      </div>
    `;
  }
}

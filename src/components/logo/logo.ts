import Block from 'core/Block';
import logo from 'images/logo.webp';

import './logo.scss';

type Props = {};

export default class Logo extends Block<Props> {
  static componentName = 'Logo';

  protected render(): string {
    return `
    <div class="logo">
      <img src=${logo} alt="details" width="250px" height="250px"></img>
    </div>
    `;
  }
}

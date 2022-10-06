import Block from 'core/Block';

import './buttonBack.scss';
import IconBack from 'icons/back.png';

type IncomingProps = {
  link?: string;
};

type Props = IncomingProps & {
};

export class ButtonBack extends Block<Props> {
  static componentName = 'ButtonBack';

  constructor({ link }: IncomingProps) {
    super({ link });
  }

  protected render(): string {
    return `
      <div class="button-back__wrapper">
        <a href="{{link}}" class="button-back__button button-icons" >
          <img src=${IconBack} alt="back" width="40px" height="40px"></img>
        </a>
      </div>
    `;
  }
}

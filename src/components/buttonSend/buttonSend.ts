import Block from 'core/Block';

import './buttonSend.scss';
import imgSend from 'icons/send.png';

type IncomingProps = {
  sendable?: boolean;
  onClick?: () => void;
};

type Props = {
  sendable?: boolean;
  events?: {
    click?: () => void;
  }
};

export class ButtonSend extends Block<Props> {
  static componentName = 'ButtonSend';

  constructor({
    onClick, ...props
  }: IncomingProps) {
    super({
      ...props, events: { click: onClick },
    });
  }

  protected render(): string {
    return `
    <div 
      class="button-send {{#if sendable}}sendable{{/if}} button-icons">
      <img src="${imgSend}" alt="details" width="40px" height="40px"></img>
    </div> 
    `;
  }
}

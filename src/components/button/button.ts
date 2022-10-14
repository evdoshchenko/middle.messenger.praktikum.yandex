import Block from 'core/Block';

import './button.scss';

type IncomingProps = {
  text?: string;
  link?: string;
  type?: string;
  modifying?: string;
  onClick?: () => void;
};

type Props = {
  text?: string;
  link?: string;
  type?: string;
  modifying?: string;
  events?: {
    click?: () => void;
  }
};

export class Button extends Block<Props> {
  static componentName = 'Button';

  constructor({
    text, link, modifying, type, onClick,
  }: IncomingProps) {
    super({
      text, link, modifying, type, events: { click: onClick },
    });
  }

  protected render(): string {
    return `
    <a href="{{link}}" type="{{type}}" class="button{{#if modifying}} button_{{modifying}}{{/if}}">
      <div class="button__caption">{{text}}</div>
    </a>  
    `;
  }
}

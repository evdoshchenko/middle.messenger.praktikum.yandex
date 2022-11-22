import { Block } from 'core';

import './button.scss';

type IncomingProps = {
  text?: string;
  link?: string;
  source?: string;
  type?: string;
  modifying?: string;
  circled?: boolean;
  onClick?: () => void;
  dataTestId?: string;
};

type Props = {
  text?: string;
  link?: string;
  source?: string;
  type?: string;
  modifying?: string;
  circled?: boolean;
  events?: {
    click?: () => void;
  };
  dataTestId?: string;
};
export class Button extends Block<Props> {
  static componentName = 'Button';

  constructor({
    onClick, ...props
  }: IncomingProps) {
    super({
      ...props, events: { click: onClick },
    });
  }

  protected render(): string {
    return `
      {{#if circled}}
        <div class="button__icons">
          <img src={{source}} alt="details" width="40px" height="40px"></img>
        </div>
      {{else}}
        <div class="button{{#if modifying}} button_{{modifying}}{{/if}}">
          <button 
            {{#if dataTestId}}data-testid="{{dataTestId}}"{{/if}}
            class="button__caption{{#if modifying}}
            button__caption_{{modifying}}{{/if}}"
            type="button">{{text}}
          </button>
        </div>
      {{/if}}
    `;
  }
}

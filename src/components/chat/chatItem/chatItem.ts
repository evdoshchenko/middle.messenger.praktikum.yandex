import { Block } from 'core';

import './chatItem.scss';

type IncomingProps = {
  type?: 'in' | 'out';
  photo?: string;
  text?: string;
  content?: string;
  userId?: string;
};

export type Props = IncomingProps;

export class ChatItem extends Block<Props> {
  static componentName = 'ChatItem';

  constructor({ ...props }: IncomingProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
      {{#if text}}
        <div class="message__buble message-{{type}}">
          {{text}}
        </div>
      {{/if}} 
      {{#if photo}}
        <div class="photo-{{type}} photo__buble">
          <img src={{photo}} width="300" height="300"></img>
        </div>
      {{/if}} 
    `;
  }
}

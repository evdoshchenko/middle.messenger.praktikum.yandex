import { Block } from 'core';

import './chatsItem.scss';

export type IncomingProps = {
  title?: string;
  avatar?: string;
  last_message?: {
    content?: string;
  }
  time?: Date;
  unread_count?: number;
  active?: boolean;
  id?: number;
  onClick?: () => void;
};

type Props = {
  title?: string;
  avatar?: string;
  last_message?: {
    content?: string;
  }
  time?: Date;
  unread_count?: number;
  active?: boolean;
  id?: number;
  events?: {
    click?: () => void;
  }
};

export class ChatsItem extends Block<Props> {
  static componentName = 'ChatsItem';

  constructor({
    onClick, ...props
  }: IncomingProps) {
    super({
      ...props, events: { click: onClick },
    });
  }

  protected render(): string {
    return `
      <div class="chats__wrapper {{classes}} {{#if active}}chats__wrapper-active{{/if}}" id="{{id}}">
        <div class="chats__data">
          <div class="chats__photo">
            {{#if photo}}
            <img src="${process.env.API_ENDPOINT}/resources{{photo}}" alt="cage" width="60px" height="60px"></img>
            {{else}}
            
            {{/if}}
          </div>
          <div class="chats__text">
            <span class="chats__name">{{user}}</span>
            <span class="chats__last-message">{{lastMessage}}</span>
          </div>
        </div>
        <div class="chats__details">
          {{#if time}}
            <time class="chats__time">{{time}}</time>
          {{else}}
            <span class="chats__time"> </span>
          {{/if}}
          
          <div class="chats__counter">
            <span class="chats__counter-text">{{counter}}</span>
          </div>
        </div>
      </div>
    `;
  }
}

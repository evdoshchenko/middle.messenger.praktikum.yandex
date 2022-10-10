import Block from 'core/Block';

import './chatsItem.scss';

export type IncomingProps = {
  user?: string;
  photo?: string;
  lastMessage?: string;
  time?: Date;
  counter?: number;
  active?: boolean;
};

type Props = IncomingProps;

export class ChatsItem extends Block<Props> {
  static componentName = 'ChatsItem';

  constructor({ ...props }: IncomingProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
      <div class="chats__wrapper {{classes}} {{#if active}}chats__wrapper-active{{/if}}">
        <div class="chats__data">
          <div class="chats__photo">
            <img src="{{photo}}" alt="cage" width="60px" height="60px"></img>
          </div>
          <div class="chats__text">
            <span class="chats__name">{{user}}</span>
            <span class="chats__last-message">{{lastMessage}}</span>
          </div>
        </div>
        <div class="chats__details">
          <span class="chats__time">{{time}}</span>
          <div class="chats__counter">
            <span class="chats__counter-text">{{counter}}</span>
          </div>
        </div>
      </div>
    `;
  }
}

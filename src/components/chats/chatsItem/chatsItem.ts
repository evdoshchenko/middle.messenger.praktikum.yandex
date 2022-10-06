import Block from 'core/Block';

import './chatsItem.scss';

type IncomingProps = {
};

type Props = {
};

export class ChatsItem extends Block<Props> {
  static componentName = 'ChatsItem';

  constructor({ ...props }: IncomingProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
      <div class="chats__wrapper {{classes}}">
        <div class="chats__data">
          <div class="chats__photo">
            <img src="{{photo}}" alt="cage" width="60px" height="60px"></img>
          </div>
          <div class="chats__text">
            <span class="chats__name">{{caption}}</span>
            <span class="chats__last-message">{{last-text}}</span>
          </div>
        </div>
        <div class="chats__details">
          <span class="chats__time">{{chats-time}}</span>
          <div class="chats__counter">
            <span class="chats__counter-text">{{counter}}</span>
          </div>
        </div>
      </div>
    `;
  }
}

import Block from 'core/Block';

import chats from 'data/chats.json';
import { ChatsItemProps } from './chatsItem';

type IncomingProps = {
};

type Props = IncomingProps;

export class Chats extends Block<Props> {
  static componentName = 'Chats';

  constructor({ ...props }: IncomingProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
    <div class="messenger__chats">
      ${chats.data.map((chat: ChatsItemProps) => `
      {{{ChatsItem 
        user="${chat.user}"
        photo="${chat.photo}"
        lastMessage="${chat.lastMessage}"
        time="${chat.time}"
        counter="${chat.counter}"
        active=${chat.active}
      }}}`).join('')}
    </div>
    `;
  }
}

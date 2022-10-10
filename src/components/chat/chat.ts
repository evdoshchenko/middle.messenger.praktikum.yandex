import Block from 'core/Block';

import messages from 'data/messages.json';
import { ChatItemProps } from './chatItem';

type IncomingProps = {
};

type Props = IncomingProps;

export class Chat extends Block<Props> {
  static componentName = 'Chat';

  constructor({ ...props }: IncomingProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
      <div class="messenger__chat">
        ${messages.data.map((message: ChatItemProps) => `
        {{{ChatItem 
          type="${message.type}"
          photo="${message.photo ? message.photo : ''}"
          text="${message.text ? message.text : ''}"
        }}}`).join('')}
      </div>
    `;
  }
}

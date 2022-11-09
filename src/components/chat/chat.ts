import {
  withStore, withRouter, withIsLoading,
} from 'utils';
import { CoreRouter, Store, Block } from 'core';
import { ChatItemProps } from './chatItem';

type Props = {
  router: CoreRouter;
  store: Store<AppState>;
  isLoading: boolean;
  user?: User | null;
  chats?: ChatsType | null;
  ws?: Nullable<WebSocket>;
  messages?: any | null;
};

class Chat extends Block<Props> {
  static componentName = 'Chat';

  protected render(): string {
    const state = this.props.store.getState();
    const messages = state.messages || [];

    const { message } = this.props.store.getState();
    const lastMessage = messages[messages.length - 1];
    if (lastMessage) {
      if (lastMessage.content === message) {
        console.log(message);
      }
    }

    return `
      <div class="messenger__chat">
        <div class="chat-content">
          ${messages.map((message: ChatItemProps) => `
          {{{ChatItem 
            type="${(message.userId === state.user?.id) ? 'out' : 'in'}"
            photo="${message.photo || ''}"
            text="${message.content || ''}"
          }}}`).join('')}
        </div>
      </div>
    `;
  }
}

const ComposedChat = withRouter(withStore(withIsLoading(Chat)));

export { ComposedChat as Chat };

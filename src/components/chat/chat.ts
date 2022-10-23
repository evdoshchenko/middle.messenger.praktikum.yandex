import {
  withStore, withRouter, withIsLoading, apiHasError,
} from 'utils';
import { CoreRouter, Store, Block } from 'core';
import Socket from 'services/messages';
import { ChatItemProps } from './chatItem';

type IncomingProps = {
};

type Props = IncomingProps & {
  router: CoreRouter;
  store: Store<AppState>;
  isLoading: boolean;
  user?: User | null;
  chats?: Chats | null;
  ws?: Nullable<WebSocket>;
  messages?: any | null,
  onDisconnectChat?: () => void;
  sendable?: boolean;
};

class Chat extends Block<Props> {
  static componentName = 'Chat';

  socket = Socket;

  constructor(props: Props) {
    super(props);

    this.setProps({
      sendable: true,
      onDisconnectChat: () => this.onDisconnectChat(),
    });
  }

  async onUpdateChat() {
    this.props.store.dispatch({ isLoading: true });

    try {
      const chatId = this.props.store.getState().activeChat?.id!;
      const id = this.props.store.getState().user?.id;
      const response = await this.socket.connectToWebsocket(id!, +chatId);

      if (apiHasError(response)) {
        return;
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.props.store.dispatch({ isLoading: false });
    }
  }

  onDisconnectChat() {
    const { message } = this.props.store.getState();
    if (message) {
      Socket.sendMessage(message);
    }
  }

  protected render(): string {
    const messages = this.props.store.getState().messages || [];

    return `
      <div class="messenger__chat">
        ${messages.map((message: ChatItemProps) => `
        {{{ChatItem 
          type="${(message.userId === this.props.store.getState().user?.id) ? 'out' : 'in'}"
          photo="${message.photo ? message.photo : ''}"
          text="${message.content ? message.content : ''}"
        }}}`).join('')}
      </div>
    `;
  }
}

const ComposedChat = withRouter(withStore(withIsLoading(Chat)));

export { ComposedChat as Chat };

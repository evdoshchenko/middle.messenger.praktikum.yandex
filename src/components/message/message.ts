import { withStore, withRouter, withIsLoading } from 'utils';
import { CoreRouter, Store, Block } from 'core';
import { validating, escape } from 'helpers';
import { Socket } from 'services';
import { chatsAPI } from 'api';
import imgAdd from 'icons/add.png';
import { Input } from '../input';
import { ButtonSend } from '../buttonSend';

import './message.scss';

type Props = {
  router: CoreRouter;
  store: Store<AppState>;
  isLoading: boolean;
  ws?: Nullable<WebSocket>;
  onInput?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onSubmit?: (e: FocusEvent) => void;
  onSendMessage?: () => void;
  sendable?: boolean;
};

type Refs = {
  inputRef: Input;
  buttonSendRef: ButtonSend;
};

class Message extends Block<Props, Refs> {
  static componentName = 'Message';

  socket = Socket;

  constructor(props: Props) {
    super(props);

    this.setProps({
      sendable: true,
      onSendMessage: () => this.onSendMessage(),
      onFocus: (e: FocusEvent) => {
        validating(e, this.refs);
      },
      onInput: (e: FocusEvent) => {
        validating(e, this.refs);
      },
      onBlur: (e: FocusEvent) => {
        e.preventDefault();
      },
      onSubmit: (e: FocusEvent) => {
        e.preventDefault();
        const data = (this.refs.inputRef.getContent() as HTMLInputElement).value;
        console.log(data);
        this.props.store.dispatch({ message: data });
      },
    });
  }

  async onSendMessage() {
    const data = escape((this.refs.inputRef.getContent() as HTMLInputElement).value);

    this.props.store.dispatch({ message: data });

    const { message } = this.props.store.getState();

    if (message) {
      Socket.sendMessage(message);
    }

    const response = chatsAPI.me();
    response.then((value:any) => {
      this.props.store.dispatch({ chats: value });
    });
  }

  protected render(): string {
    return `
      <div class="messenger__message">
        <div class="message__wrapper">
          <div class="message__add">
            <img src="${imgAdd}" alt="details" width="40px" height="40px"></img>
          </div>
          {{{Input
            name="message"
            type="text"
            validateType="Email"
            placeholder="Write a message..."
            onInput=onInput
            onFocus=onFocus
            onBlur=onBlur
            modifying="message"
            ref="inputRef" 
          }}}
          {{{ButtonSend ref="buttonSendRef" onClick=onSendMessage sendable="{{sendable}}" }}}
        </div>
      </div>
    `;
  }
}

const ComposedMessage = withRouter(withStore(withIsLoading(Message)));

export { ComposedMessage as Message };

import { withStore, withRouter, withIsLoading } from 'utils';
import { newchat } from 'services/chats';
import { CoreRouter, Store, Block } from 'core';
import validating from 'helpers/validating';
import escape from 'helpers/escape';
import './newchat.scss';
import Input from '../input';
import ButtonSend from '../buttonSend';

type Props = {
  router: CoreRouter;
  store: Store<AppState>;
  isLoading: boolean;
  user?: User | null;
  chats?: Chats | null;
  name?: string;
  placeholder?: string;
  onInput?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onSubmit?: (e: FocusEvent) => void;
  onNewChat?: () => void;
  sendable?: boolean;
};

type Refs = {
  inputRef: Input;
  buttonSendRef: ButtonSend;
};

class NewChat extends Block<Props, Refs> {
  static componentName = 'NewChat';

  constructor(props: Props) {
    super(props);

    this.setProps({
      sendable: true,
      onNewChat: () => this.onNewChat(),
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
      },
    });
  }

  onNewChat() {
    const data = {
      title: `${escape(String((this.refs.inputRef.getContent() as HTMLInputElement).value))}`,
    };
    this.props.store.dispatch(newchat, data);
  }

  protected render(): string {
    return `
    <div class="messenger__newchat">
      <div class="newchat__wrapper">

        {{{Input
          name="newchat"
          type="text"
          validateType="Email"
          placeholder="New chat"
          onInput=onInput
          onFocus=onFocus
          onBlur=onBlur
          modifying="search"
          ref="inputRef" 
        }}}
        {{{ButtonSend ref="buttonSendRef" onClick=onNewChat sendable="{{sendable}}" }}}

      </div>
    </div>
    `;
  }
}

const ComposedNewChat = withRouter(withStore(withIsLoading(NewChat)));

export { ComposedNewChat as NewChat };

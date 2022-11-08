import {
  withStore, withRouter, withIsLoading,
} from 'utils';
import { CoreRouter, Store, Block } from 'core';
import { chatsAPI } from 'api';
import { Socket } from 'services';

type Props = {
  router: CoreRouter;
  store: Store<AppState>;
  isLoading: boolean;
  user: User | null;
  chats: ChatsType | null;
  onSignIn?: () => void;
  firstName: string;
  users: string
};
class MessengerPage extends Block<Props, {}> {
  static componentName = 'MessengerPage';

  socket = Socket;

  constructor(props: Props) {
    super(props);

    this.setProps({
      chats: this.props.store.getState().chats,
      firstName: '...',
      users: '...',
    });
  }

  componentDidMount() {
    setTimeout(() => {
      const state = this.props.store.getState();
      const id = state.activeChat?.id!;
      const response = chatsAPI.getUsers(id!);
      response.then((value:any) => {
        this.props.store.dispatch({ users: value });
      });

      const chatId = state.activeChat?.id!;
      const userId = state.user?.id;

      this.socket.connectToWebsocket(userId!, +chatId);
    }, 1000);
  }

  onSignIn() {
    this.props.router.go('/sign-in');
  }

  render() {
    const { users, activeChat } = this.props.store.getState();
    const usersArr = Object.entries({ users })[0][1];
    const newUsers = [];

    for (let i = 0; i < usersArr?.length!; i += 1) {
      newUsers!.push(usersArr![i].id);
    }

    return `
    {{#Layout isLoading=true}}
      <div class="messenger">
      
        <div class="messenger__left">
          {{{NewChat }}}
          {{{Chats}}}
          {{{Tabs}}}
        </div>
        <div class="messenger__right">
          {{{Contact 
            firstName="${activeChat?.title || 'Loading...'}"
            users="Users: ${newUsers !== undefined ? newUsers : '...'}"
            avatar="${activeChat?.avatar || ''}"
          }}}
          {{{Chat}}}
          {{{Message}}}
        </div>
      </div>
    {{/Layout}}
    `;
  }
}

const ComposedMessengerPage = withRouter(withStore(withIsLoading(MessengerPage)));

export { ComposedMessengerPage as MessengerPage };

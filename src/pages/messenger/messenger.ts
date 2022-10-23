import {
  withUser, withStore, withRouter, withIsLoading,
} from 'utils';
import { CoreRouter, Store, Block } from 'core';
import { chatsAPI } from 'api/chats';
import Socket from 'services/messages';

type Props = {
  router: CoreRouter;
  store: Store<AppState>;
  isLoading: boolean;
  user: User | null;
  chats: Chats | null;
  onSignIn?: () => void;
  firstName: string;
  users: string
};
export class MessengerPage extends Block<Props, {}> {
  static componentName = 'MessengerPage';

  socket = Socket;

  constructor(props: Props) {
    super(props);

    this.setProps({
      chats: this.props.store.getState().chats,
      firstName: '2',
      users: '1',
    });
  }

  componentDidMount() {
    setTimeout(() => {
      const id = this.props.store.getState().activeChat?.id!;
      const response = chatsAPI.getusers(id!);
      response.then((value:any) => {
        this.props.store.dispatch({ users: value });
      });

      const chatId = this.props.store.getState().activeChat?.id!;
      const userId = this.props.store.getState().user?.id;

      this.socket.connectToWebsocket(userId!, +chatId);
    }, 1000);
  }

  onSignIn() {
    this.props.router.go('/sign-in');
  }

  render() {
    const { users } = this.props.store.getState();
    const usersArr = Object.entries({ users })[0][1];
    const newUsers = [];

    for (let i = 0; i < usersArr?.length!; i += 1) {
      newUsers!.push(usersArr![i].id);
    }

    const { activeChat } = this.props.store.getState();

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
            firstName="${activeChat?.title ? activeChat?.title : 'Loading...'}"
            users="Users: ${newUsers !== undefined ? newUsers : '...'}"
            avatar="${activeChat?.avatar ? activeChat?.avatar : ''}"
          }}}
          {{{Chat}}}
          {{{Message}}}
        </div>
      </div>
    {{/Layout}}
    `;
  }
}

export default withRouter(withStore(withIsLoading(withUser(MessengerPage))));

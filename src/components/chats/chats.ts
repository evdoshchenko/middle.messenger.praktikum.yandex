import {
  withStore, withRouter, withIsLoading, transformChats,
} from 'utils';
import { CoreRouter, Store, Block } from 'core';
import { Socket, initChats } from 'services';
import { chatsAPI, ChatsDTO } from 'api';
import { ChatsItem } from './chatsItem';

type Props = {
  router: CoreRouter;
  store: Store<AppState>;
  isLoading: boolean;
  user?: User | null;
  chats?: Chats | null;
  onActive?: (e: FocusEvent) => void;
  onChat?: () => void;
  active?: boolean;
};

type Refs = {
  chats: ChatsItem;
};
class Chats extends Block<Props, Refs> {
  static componentName = 'Chats';

  socket = Socket;

  constructor(props: Props) {
    super(props);

    this.setProps({
      active: false,
      onActive: (e: FocusEvent) => {
        this.onActive(e);
      },
      onChat: () => this.onChat(),
    });
  }

  onChat() {
    this.props.store.dispatch(initChats);
  }

  onActive(e: FocusEvent) {
    const currentElement = (e.currentTarget as HTMLElement);

    const currentClass = currentElement.getAttribute('class');
    const chats = document.getElementsByClassName('chats__wrapper');
    const chatsArray = Object.entries(chats);
    chatsArray.forEach((chats) => {
      const chatsWrapper = chats[1] as HTMLElement;
      chatsWrapper.setAttribute('class', 'chats__wrapper');
    });
    currentElement.setAttribute('class', `${currentClass} chats__wrapper-active`);

    const id = currentElement.getAttribute('id');
    const title = currentElement.querySelector('.chats__name')?.textContent;
    const avatar = currentElement.getElementsByTagName('img')[0];
    if (avatar) {
      const { src } = avatar;
      this.props.store.dispatch({
        activeChat: {
          id: id!,
          title: title!,
          avatar: src,
        },
      });
    } else {
      this.props.store.dispatch({
        activeChat: {
          id: id!,
          title: title!,
        },
      });
    }

    chatsAPI.getUsers(id!)
      .then((value:any) => {
        this.props.store.dispatch({ users: value });
      });

    const state = this.props.store.getState();
    const chatId = state.activeChat?.id!;
    const userId = state.user?.id;
    this.socket.connectToWebsocket(userId!, +chatId);
  }

  protected render(): string {
    const state = this.props.store.getState();
    const { chats } = state;
    const chatId = Number(state.activeChat?.id!);

    if (chats === null) {
      return `
        {{#Layout isLoading=true}}
           
        {{/Layout}}
      `;
    }

    return `
    <div class="messenger__chats">
    ${(chats as any)
    .map((chat: ChatsDTO) => transformChats(chat as ChatsDTO))
    .map((chat: ChatsType) => {
      return `
        {{{ChatsItem 
          lastMessage="${chat.lastMessage ? String(chat.lastMessage.content) : '...'}"
          user="${chat.title || '...'}"
          photo="${chat.avatar || ''}"
          time="${chat.time || ''}"
          counter="${chat.unreadCount || ''}"
          id="${chat.id || ''}"
          active="${(chat.id === chatId) ? chat.id : ''}"
          onClick=onActive
          ref="chats" 
        }}}`;
    }).join('')}
    </div>
    `;
  }
}

const ComposedChats = withRouter(withStore(withIsLoading(Chats)));

export { ComposedChats as Chats };

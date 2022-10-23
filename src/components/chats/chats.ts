import { withStore, withRouter, withIsLoading } from 'utils';
import { CoreRouter, Store, Block } from 'core';
import { initChats } from 'services/initChats';
import { chatsAPI } from 'api/chats';
import Socket from 'services/messages';
import ChatsItem, { ChatsItemProps } from './chatsItem';

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
    for (let i = 0; i < chatsArray.length; i += 1) {
      (chatsArray[i][1] as HTMLElement).setAttribute('class', 'chats__wrapper');
    }
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

    chatsAPI.getusers(id!)
      .then((value:any) => {
        this.props.store.dispatch({ users: value });
      });

    const chatId = this.props.store.getState().activeChat?.id!;
    const userId = this.props.store.getState().user?.id;
    this.socket.connectToWebsocket(userId!, +chatId);
  }

  protected render(): string {
    const { chats } = this.props.store.getState();
    const chatId = Number(this.props.store.getState().activeChat?.id!);

    if (chats === null) {
      return `
        {{#Layout isLoading=true}}
           
        {{/Layout}}
      `;
    }

    return `
      <div class="messenger__chats">
        ${(chats as any).map((chat: ChatsItemProps) => `
        {{{ChatsItem 
          lastMessage="${chat.last_message ? String(chat.last_message.content) : '...'}"
          user="${chat.title ? chat.title : '...'}"
          photo="${chat.avatar ? chat.avatar : ''}"
          
          time="${chat.time ? chat.time : ''}"
          counter="${chat.unread_count}"
          id="${chat.id ? chat.id : ''}"
          active="${(chat.id === chatId) ? chat.id : ''}"
          onClick=onActive
          ref="chats" 
        }}}`).join('')}
      </div>
    `;
  }
}

const ComposedChats = withRouter(withStore(withIsLoading(Chats)));

export { ComposedChats as Chats };

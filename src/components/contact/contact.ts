import { withStore, withRouter, withIsLoading } from 'utils';
import { CoreRouter, Store, Block } from 'core';
import { chatsAPI } from 'api';
import { validatingSubmit } from 'helpers';
import { addUser, deleteUser } from 'services';
import { ControlledInput } from 'components';

import './contact.scss';
import imgDetails from 'icons/details.png';

type Props = {
  firstName?: string;
  secondName?: string;
  users?: string;
  avatar?: string;
  router: CoreRouter;
  store: Store<AppState>;
  isLoading: boolean;
  user?: User | null;
  chats?: ChatsType | null;
  onActive?: (e: FocusEvent) => void;
  active?: boolean;
  onDelete?: () => void;
  onAdd?: () => void;
  onDetails?: () => void;
  moduleDetails?: string;
};

type Refs = {
  userRef: ControlledInput;
};

class Contact extends Block<Props, Refs> {
  static componentName = 'Contact';

  constructor(props: Props) {
    super(props);
    this.setProps({
      onDelete: () => this.onDelete(),
      onAdd: () => this.onAdd(),
      onDetails: () => this.onDetails(),
      moduleDetails: '',
    });
  }

  onDelete() {
    validatingSubmit(this.refs);

    const state = this.props.store.getState();
    const userId: String = (this.refs.userRef.refs.inputRef.getContent() as HTMLInputElement).value;
    const chatId = state.activeChat?.id;
    const data = {
      users: [
        userId,
      ],
      chatId,
    };

    if (data) {
      this.props.store.dispatch(deleteUser, data);

      this.updateUsers();
    }
  }

  onAdd() {
    validatingSubmit(this.refs);

    const state = this.props.store.getState();
    const userId: String = (this.refs.userRef.refs.inputRef.getContent() as HTMLInputElement).value;
    const chatId = state.activeChat?.id;

    const data = {
      users: [
        userId,
      ],
      chatId,
    };

    if (data) {
      this.props.store.dispatch(addUser, data);
      this.updateUsers();
    }
  }

  async updateUsers() {
    const state = this.props.store.getState();
    this.props.store.dispatch({ isLoading: true });
    const response:any = await chatsAPI.getUsers(state.activeChat?.id!);
    this.props.store.dispatch({ users: response, isLoading: false });
  }

  onDetails() {
    if (!this.props.moduleDetails) {
      this.setProps({ moduleDetails: '_active' });
    } else {
      this.setProps({ moduleDetails: '' });
    }
  }

  protected render(): string {
    return `
      <div class="messenger__contact">
        <div class="contact__wrapper">
          <div class="contact__data">
            <div class="contact__photo">
              {{#if avatar}}
                <img src="${this.props.avatar}" alt="contact-avatar" width="40px" height="40px"></img>
              {{else}}
                
              {{/if}}
              
            </div>
            <div class="contact__name">
              ${this.props.firstName}
              <div class="contact__users">
                ${this.props.users}
              </div>
            </div>

          </div>
          <div class="contact__details">
            
            {{{Button text="Profi" onClick=onDetails circled=true source="${imgDetails}"}}}

            <form class="form form-module${this.props.moduleDetails}">
              <div class="form__top">

                {{{Title text="Manage users"}}}
                {{{Subtitle text="Enter user ID"}}}
                
                {{{ControlledInput
                  modifying="sign"
                  ref="userRef"
                  type="UserID"
                  validateType="UserID"
                  name="login"
                  label="Login"
                  placeholder="user ID"
                  onInput=onInput
                  onFocus=onFocus
                  value=""
                }}}
              </div>
                
              <div class="form__bottom">
                {{{Button text="Add user" onClick=onAdd modifying="attraction"}}}
                {{{Button text="Delete user" onClick=onDelete }}}
              </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

const ComposedContact = withRouter(withStore(withIsLoading(Contact)));

export { ComposedContact as Contact };

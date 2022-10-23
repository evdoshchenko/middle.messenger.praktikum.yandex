import {
  withUser, withStore, withRouter, withIsLoading,
} from 'utils';
import { logout } from 'services/auth';
import { CoreRouter, Store, Block } from 'core';
import { sendSubmit } from 'helpers/sendSubmit';
import { validatingSubmit } from 'helpers/validatingSubmit';
import { edit, editavatar } from 'services/user';
import ControlledInput from 'components/controlledInput';
import ProfilePhoto from 'components/profilePhoto';

type Props = {
  router: CoreRouter;
  store: Store<AppState>;
  isLoading: boolean;
  user: User | null;
  onSignIn?: () => void;
  onSignUp?: () => void;
  onLogOut?: () => void;
  onEdit?: () => void;
  onEditPassword?: () => void;
  onSubmit?: (e: FocusEvent) => void;
  disabled: boolean;
  infoButton: string;
};

type Refs = {
  avatarRef: ProfilePhoto;
  firstNameInputRef: ControlledInput;
  secondNameInputRef: ControlledInput;
  displayNameInputRef: ControlledInput;
  emailInputRef: ControlledInput;
  phoneInputRef: ControlledInput;
  passwordInputRef: ControlledInput;
};

export class ProfilePage extends Block<Props, Refs> {
  static componentName = 'ProfilePage';

  constructor(props: Props) {
    super(props);

    this.setProps({
      onSignIn: () => this.onSignIn(),
      onSignUp: () => this.onSignUp(),
      onLogOut: () => this.onLogOut(),
      onEdit: () => this.onEdit(),
      onEditPassword: () => this.onEditPassword(),
      disabled: true,
      infoButton: 'Edit information',
    });
  }

  onEdit() {
    if (this.props.infoButton === 'Edit information') {
      this.props.disabled = false;
      this.props.infoButton = 'Save information';
    } else {
      validatingSubmit(this.refs);
      const data = sendSubmit();
      if (data) {
        if (data.avatar) {
          const avatar: any = document.getElementById('avatar');
          const file = avatar.files[0];

          this.props.store.dispatch(editavatar, file);
        } else {
          this.props.store.dispatch(edit, data);
        }
        this.props.disabled = true;
        this.props.infoButton = 'Edit information';
      }
    }
  }

  onEditPassword() {
    this.props.router.go('/password');
  }

  onSignIn() {
    this.props.router.go('/sign-in');
  }

  onSignUp() {
    this.props.router.go('/sign-up');
  }

  onLogOut() {
    this.props.store.dispatch({
      appIsInited: false,
      isLoading: false,
      loginFormError: null,
      user: null,
      activeChat: null,
      users: null,
      chats: null,
      messages: null,
      message: null,
      ws: null,
    });
    this.props.store.dispatch(logout);
  }

  render() {
    const { user } = this.props.store.getState();
    if (!user) {
      return `
        {{#Layout }}
          no authorized user
        {{/Layout}}
      `;
    }

    return `
    {{#Layout isLoading=true}}
      <div class="messenger">
        <div class="messenger__left">
          {{{ButtonBack link="/messenger"}}}
        </div>

        <div class="messenger__right">
          <div class="form__wrapper">
            <div class="form form-profile">
              <div class="form__top">
                {{{ProfilePhoto 
                  name="avatar" 
                  imglink="${process.env.API_ENDPOINT}/resources${user.avatar ? user.avatar : ' '}"
                  disabled=${this.props.disabled}
                }}}
                {{{Title text="${user.login ? user.login : ' '}"}}}

                {{{ControlledInput
                  modifying="profile"
                  disabled=${this.props.disabled}
                  ref="firstNameInputRef"
                  type="First name"
                  validateType="FirstName"
                  name="first_name"
                  label="First name"
                  placeholder="First name"
                  onInput=onInput
                  onFocus=onFocus
                  value="${user.firstName ? user.firstName : ' '}"
                }}}
                {{{ControlledInput
                  modifying="profile"
                  disabled=${this.props.disabled}
                  ref="secondNameInputRef"
                  type="Second name"
                  validateType="SecondName"
                  name="second_name"
                  label="Second name"
                  placeholder="Second name"
                  onInput=onInput
                  onFocus=onFocus
                  value="${user.secondName ? user.secondName : ' '}"
                }}}
                {{{ControlledInput
                  modifying="profile"
                  disabled=${this.props.disabled}
                  ref="displayNameInputRef"
                  type="Display name"
                  validateType="DisplayName"
                  name="display_name"
                  label="Display name"
                  placeholder="Display name"
                  onInput=onInput
                  onFocus=onFocus
                  value="${user.displayName ? user.displayName : ' '}"
                }}}
                {{{ControlledInput
                  modifying="profile"
                  disabled=${this.props.disabled}
                  ref="loginInputRef"
                  type="Login"
                  validateType="Login"
                  name="login"
                  label="Login"
                  placeholder="Login"  
                  onInput=onInput
                  onFocus=onFocus
                  value="${user.login ? user.login : ' '}"
                }}}
                {{{ControlledInput
                  modifying="profile"
                  disabled=${this.props.disabled}
                  ref="emailInputRef"
                  type="Email"
                  validateType="Email"
                  name="email"
                  label="Email"
                  placeholder="Email"
                  onInput=onInput
                  onFocus=onFocus
                  onClick=onClick
                  value="${user.email ? user.email : ' '}"
                }}}
                {{{ControlledInput
                  modifying="profile"
                  disabled=${this.props.disabled}
                  ref="phoneInputRef"
                  type="Phone"
                  validateType="Phone"
                  name="phone"
                  label="Phone"
                  placeholder="Phone"  
                  onInput=onInput
                  onFocus=onFocus
                  value="${user.phone ? user.phone : ' '}"
                }}}
              </div>

              <div class="form__bottom">
                {{{Button text="${this.props.infoButton}" onClick=onEdit}}}
                {{{Button text="Change password" onClick=onEditPassword}}}
                {{{Button text="Log out" onClick=onLogOut modifying="danger"}}}
              </div>

            </div>
          </div>
        </div>
      </div>
    {{/Layout}}
    `;
  }
}

export default withRouter(withStore(withIsLoading(withUser(ProfilePage))));

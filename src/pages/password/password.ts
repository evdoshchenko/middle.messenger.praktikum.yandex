import {
  withStore, withRouter, withIsLoading,
} from 'utils';
import { CoreRouter, Store, Block } from 'core';
import { sendSubmit, validatingSubmit } from 'helpers';
import { ControlledInput } from 'components';
import { editPassword } from 'services';

type Props = {
  router: CoreRouter;
  store: Store<AppState>;
  isLoading: boolean;
  user: User | null;
  onSave?: () => void;
  error: string;
};

type Refs = {
  oldPasswordInputRef: ControlledInput;
  newPasswordInputRef: ControlledInput;
  confirmPasswordInputRef: ControlledInput;
};

class PasswordPage extends Block<Props, Refs> {
  constructor(props: Props) {
    super(props);

    this.setProps({
      onSave: () => this.onSave(),
    });
  }

  onSave() {
    validatingSubmit(this.refs);
    if (sendSubmit()) {
      const data = sendSubmit();
      this.props.store.dispatch(editPassword, data);
    }
  }

  render() {
    const state = this.props.store.getState();
    const { user } = state;
    const error = state.loginFormError;

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
          {{{ButtonBack link="/signin"}}}
        </div>

        <div class="messenger__right">
          <div class="form__wrapper">
            <div class="form form-profile">
              <div class="form__top">
                {{{ProfilePhoto 
                  name="avatar" 
                  imglink="${process.env.API_ENDPOINT}/resources${user.avatar || ' '}"
                  disabled=true
                }}}
                {{{Title text="${user.login || ' '}"}}}
                {{{Subtitle text="${error !== null ? error : ''}"}}}

                {{{ControlledInput
                  modifying="profile"
                  ref="oldPasswordInputRef"
                  type="password"
                  validateType="Password"
                  name="oldPassword"
                  label="Current"
                  placeholder="Your Password"
                  onInput=onInput
                  onFocus=onFocus
                }}}
                {{{ControlledInput
                  modifying="profile"
                  ref="newPasswordInputRef"
                  type="Password"
                  validateType="Password"
                  name="newPassword"
                  label="New"
                  placeholder="New Password"
                  onInput=onInput
                  onFocus=onFocus
                }}}


              <div class="form__bottom">
                {{{Button text="Save" link="/signin" onClick=onSave}}}
              </div>

            </div>
          </div>
        </div>
      </div>
    {{/Layout }}
    `;
  }
}

const ComposedPasswordPage = withRouter(withStore(withIsLoading(PasswordPage)));

export { ComposedPasswordPage as PasswordPage };

import {
  withUser, withStore, withRouter, withIsLoading,
} from 'utils';
import { CoreRouter, Store, Block } from 'core';

import { sendSubmit } from 'helpers/sendSubmit';
import { validatingSubmit } from 'helpers/validatingSubmit';
import ControlledInput from 'components/controlledInput';
import { editpassword } from 'services/user';

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

export class PasswordPage extends Block<Props, Refs> {
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
      this.props.store.dispatch(editpassword, data);
    }
  }

  render() {
    const { user } = this.props.store.getState();
    const error = this.props.store.getState().loginFormError;

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
                  imglink="https://ya-praktikum.tech/api/v2/resources${user.avatar ? user.avatar : ' '}"
                  disabled=true
                }}}
                {{{Title text="${user.login ? user.login : ' '}"}}}
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

export default withRouter(withStore(withIsLoading(withUser(PasswordPage))));

import Block from 'core/Block';
import { sendSubmit } from 'helpers/sendSubmit';
import { validatingSubmit } from 'helpers/validatingSubmit';
import ControlledInput from 'components/controlledInput';

import Avatar from 'images/avatars/leo.png';

type IncomingProps = {
};

type Props = IncomingProps & {
  onSubmit?: (e: FocusEvent) => void;
};

type Refs = {
  oldPasswordInputRef: ControlledInput;
  newPasswordInputRef: ControlledInput;
  confirmPasswordInputRef: ControlledInput;
};

export class ProfileEditPassPage extends Block<Props, Refs> {
  constructor() {
    super();

    this.setProps({
      onSubmit: (e: FocusEvent) => {
        e.preventDefault();
        validatingSubmit(this.refs);
        if (sendSubmit()) {
          console.log(sendSubmit());
        }
      },
    });
  }

  render() {
    return `
    <div class="messenger">
      <div class="messenger__left">
        {{{ButtonBack link="/signin"}}}
      </div>

      <div class="messenger__right">
        <div class="form__wrapper">
          <div class="form form-profile">
            <div class="form__top">
              {{{ProfilePhoto name="avatar" imglink="${Avatar}"}}}
              {{{Title text="Change password"}}}

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
                placeholder="Your Password"
                onInput=onInput
                onFocus=onFocus
              }}}
              {{{ControlledInput
                modifying="profile"
                ref="confirmPasswordInputRef"
                type="Password"
                validateType="Password"
                name="confirmPassword"
                label="Confirm"
                placeholder="Your Password"
                onInput=onInput
                onFocus=onFocus
              }}}
            </div>

            <div class="form__bottom">
              {{{Button text="Save" link="/signin" onClick=onSubmit}}}
            </div>

          </div>
        </div>
      </div>
    </div>
    `;
  }
}

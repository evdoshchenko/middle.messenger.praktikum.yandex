import Block from 'core/Block';
import ControlledInput from 'components/controlledInput';

import Avatar from 'images/avatars/leo.png';

type IncomingProps = {
};

type Props = IncomingProps & {
  onSubmit?: (e: FocusEvent) => void;
};

type Refs = {
  firstNameInputRef: ControlledInput;
  secondNameInputRef: ControlledInput;
  displayNameInputRef: ControlledInput;
  emailInputRef: ControlledInput;
  phoneInputRef: ControlledInput;
  passwordInputRef: ControlledInput;
};

export class ProfilePage extends Block<Props, Refs> {
  constructor() {
    super();

    this.setProps({
      onSubmit: (e: FocusEvent) => {
        e.preventDefault();
        console.log('clicked3');
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
              {{{Title text="Leonardo Di Caprio"}}}

              {{{ControlledInput
                modifying="profile"
                disabled="disabled"
                ref="firstNameInputRef"
                type="First name"
                validateType="FirstName"
                name="first_name"
                label="First name"
                placeholder="Leonardo"
                onInput=onInput
                onFocus=onFocus
              }}}
              {{{ControlledInput
                modifying="profile"
                disabled="disabled"
                ref="secondNameInputRef"
                type="Second name"
                validateType="SecondName"
                name="second_name"
                label="Second name"
                placeholder="Di Caprio"
                onInput=onInput
                onFocus=onFocus
              }}}
              {{{ControlledInput
                modifying="profile"
                disabled="disabled"
                ref="displayNameInputRef"
                type="Display name"
                validateType="DisplayName"
                name="display_name"
                label="Display name"
                placeholder="Leo"
                onInput=onInput
                onFocus=onFocus
              }}}
              {{{ControlledInput
                modifying="profile"
                disabled="disabled"
                ref="loginInputRef"
                type="Login"
                validateType="Login"
                name="login"
                label="Login"
                placeholder="leodi"
                onInput=onInput
                onFocus=onFocus
              }}}
              {{{ControlledInput
                modifying="profile"
                disabled="disabled"
                ref="emailInputRef"
                type="Email"
                validateType="Email"
                name="email"
                label="Email"
                placeholder="leo@di.app"
                onInput=onInput
                onFocus=onFocus
                onClick=onClick
              }}}
              {{{ControlledInput
                modifying="profile"
                disabled="disabled"
                ref="phoneInputRef"
                type="Phone"
                validateType="Phone"
                name="phone"
                label="Phone"
                placeholder="+1 234-555-6789"
                onInput=onInput
                onFocus=onFocus
              }}}
            </div>

            <div class="form__bottom">
              {{{Button text="Edit information" link="/signin" onClick=onSubmit}}}
              {{{Button text="Change password" link="/signup" onClick=onSubmit}}}
              {{{Button text="Log out" link="/signup" onClick=onSubmit modifying="danger"}}}
            </div>

          </div>
        </div>
      </div>
    </div>
    `;
  }
}

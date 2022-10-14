import Block from 'core/Block';
import { sendSubmit } from 'helpers/sendSubmit';
import { validatingSubmit } from 'helpers/validatingSubmit';
import ControlledInput from 'components/controlledInput';

type IncomingProps = {
};

type Props = IncomingProps & {
  onSubmit?: (e: FocusEvent) => void;
};

type Refs = {
  firstNameInputRef: ControlledInput;
  loginInputRef: ControlledInput;
  secondNameInputRef: ControlledInput;
  displayNameInputRef: ControlledInput;
  emailInputRef: ControlledInput;
  phoneInputRef: ControlledInput;
  passwordInputRef: ControlledInput;
  passwordInputConfirmRef: ControlledInput;
};

export class SignupPage extends Block<Props, Refs> {
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
      <div class="form__wrapper">
        <div class="form form-signup">
          <div class="form__top">

            {{{Title text="Registration"}}}
            {{{ControlledInput
              modifying="sign"
              ref="emailInputRef"
              type="Email"
              validateType="Email"
              name="email"
              label="Email"
              placeholder="Your Email"
              onInput=onInput
              onFocus=onFocus
            }}}
            {{{ControlledInput
              modifying="sign"
              ref="loginInputRef"
              type="Login"
              validateType="Login"
              name="login"
              label="Login"
              placeholder="Your Login"
              onInput=onInput
              onFocus=onFocus
            }}}
            {{{ControlledInput
              modifying="sign"
              ref="firstNameInputRef"
              type="First name"
              validateType="FirstName"
              name="first_name"
              label="First name"
              placeholder="Your FirstName"
              onInput=onInput
              onFocus=onFocus
            }}}
            {{{ControlledInput
              modifying="sign"
              ref="secondNameInputRef"
              type="Second name"
              validateType="SecondName"
              name="second_name"
              label="Second name"
              placeholder="Your Second name"
              onInput=onInput
              onFocus=onFocus
            }}}
            {{{ControlledInput
              modifying="sign"
              ref="phoneInputRef"
              type="Phone"
              validateType="Phone"
              name="phone"
              label="Phone"
              placeholder="Your Phone"
              onInput=onInput
              onFocus=onFocus
            }}}
            {{{ControlledInput
              modifying="sign"
              ref="passwordInputRef"
              type="Password"
              validateType="Password"
              name="password"
              label="Password"
              placeholder="Your Password"
              onInput=onInput
              onFocus=onFocus
            }}}
            {{{ControlledInput
              modifying="sign"
              ref="passwordInputConfirmRef"
              type="Password"
              validateType="Password"
              name="confirmPassword"
              label="Password"
              placeholder="Confirm Password"
              onInput=onInput
              onFocus=onFocus
            }}}
          </div>
          
          <div class="form__bottom">
          {{{Button text="Create account" link="/error404" onClick=onSubmit modifying="attraction"}}}
          {{{Button text="Sign in" link="/signin" onClick=onSubmit}}}
          </div>

        </div>
      </div>
    `;
  }
}

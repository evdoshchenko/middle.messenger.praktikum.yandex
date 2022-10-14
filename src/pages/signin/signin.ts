import Block from 'core/Block';
import { sendSubmit } from 'helpers/sendSubmit';
import { validatingSubmit } from 'helpers/validatingSubmit';
import ControlledInput from 'components/controlledInput';
import Link from 'components/link';

type IncomingProps = {
};

type Props = IncomingProps & {
  onSubmit?: (e: FocusEvent) => void;
  onLink?: (e: FocusEvent) => void;
};

type Refs = {
  loginInputRef: ControlledInput;
  passwordInputRef: ControlledInput;
  linkRef: Link;
};

export class SigninPage extends Block<Props, Refs> {
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
      onLink: (e: FocusEvent) => {
        e.preventDefault();
        const nextValue = String(Number(this.refs.linkRef.getProps().text) + 1);
        this.refs.linkRef.setProps({ text: nextValue });
      },
    });
  }

  render() {
    return `
      <div class="form__wrapper">
        <form class="form form-signin">
          <div class="form__top">

            {{{Title text="Hey, lynx!"}}}
            
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
              ref="passwordInputRef"
              type="Password"
              validateType="Password"
              name="password"
              label="Password"
              placeholder="Your Password"
              onInput=onInput
              onFocus=onFocus
            }}}
          </div>
          
          <div class="form__bottom">
            {{{Button text="Sign in" link="/signin" onClick=onSubmit type="Submit" modifying="attraction"}}}
            {{{Button text="Sign up" link="/signup" onClick=onSubmit}}}
          </div>

        </form>
      </div>
    `;
  }
}

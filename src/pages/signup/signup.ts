import { withStore, withRouter, withIsLoading } from 'utils';
import { CoreRouter, Store, Block } from 'core';
import { sendSubmit, validatingSubmit } from 'helpers';
import { signup } from 'services';
import { ControlledInput } from 'components/controlledInput';

type Props = {
  router: CoreRouter;
  store: Store<AppState>;
  isLoading: boolean;
  onToggleAppLoading?: () => void;
  onNavigateNext?: () => void;
  onCreateAccount?: () => void;
  onSignIn?: () => void;
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

class SignUpPage extends Block<Props, Refs> {
  constructor(props: Props) {
    super(props);

    this.setProps({
      onCreateAccount: () => this.onCreateAccount(),
      onSignIn: () => this.onSignIn(),
    });
  }

  onCreateAccount() {
    validatingSubmit(this.refs);
    const data = sendSubmit();
    if (data) {
      this.props.store.dispatch(signup, data);
    }
  }

  onSignIn() {
    this.props.router.go('/sign-in');
  }

  render() {
    return `
    {{#Layout isLoading=true}}
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

          {{{Button text="Create account" onClick=onCreateAccount modifying="attraction"}}}
          {{{Button text="or Sign in" onClick=onSignIn }}}
          </div>

        </div>
      </div>
    {{/Layout}}
    `;
  }
}

const ComposedSignUpPage = withRouter(withStore(withIsLoading(SignUpPage)));

export { ComposedSignUpPage as SignUpPage };

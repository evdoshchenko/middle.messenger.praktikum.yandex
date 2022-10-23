import { withStore, withRouter, withIsLoading } from 'utils';
import { CoreRouter, Store, Block } from 'core';
import { sendSubmit } from 'helpers/sendSubmit';
import { validatingSubmit } from 'helpers/validatingSubmit';
import ControlledInput from 'components/controlledInput';
import { login } from 'services/auth';
import Link from 'components/link';
import { initChats } from 'services/initChats';

type Props = {
  router: CoreRouter;
  store: Store<AppState>;
  isLoading: boolean;
  onToggleAppLoading?: () => void;
  onNavigateNext?: () => void;
  onSignIn?: () => void;
  onSignUp?: () => void;
};

type Refs = {
  loginInputRef: ControlledInput;
  passwordInputRef: ControlledInput;
  linkRef: Link;
};

export class SigninPage extends Block<Props, Refs> {
  static componentName = 'SigninPage';

  constructor(props: Props) {
    super(props);

    this.setProps({
      onSignIn: () => this.onSignIn(),
      onSignUp: () => this.onSignUp(),
    });
  }

  onSignIn() {
    validatingSubmit(this.refs);
    const data = sendSubmit();
    if (data) {
      this.props.store.dispatch(login, data);
      this.props.store.dispatch(initChats);
    }
  }

  onSignUp() {
    this.props.router.go('/sign-up');
  }

  render() {
    const error = this.props.store.getState().loginFormError;

    return `
    {{#Layout isLoading=true}}
      <div class="form__wrapper">
        <form class="form form-signin">
          <div class="form__top">

            {{{Title text="Hey, lynx!"}}}
            {{{Subtitle text="${error !== null ? error : ''}"}}}
            
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
              value="Testqqq2"
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
              value="Testqqq2"
            }}}
          </div>
          
          <div class="form__bottom">
            {{{Button text="Sign in" onClick=onSignIn modifying="attraction"}}}
            {{{Button text="Sign up" onClick=onSignUp }}}
          </div>

        </form>
      </div>
    {{/Layout}}
    `;
  }
}

export default withRouter(withStore(withIsLoading(SigninPage)));

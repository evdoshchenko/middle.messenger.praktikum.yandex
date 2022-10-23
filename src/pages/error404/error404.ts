import { withStore, withRouter, withIsLoading } from 'utils';
import { CoreRouter, Store, Block } from 'core';

type Props = {
  router: CoreRouter;
  store: Store<AppState>;
  isLoading: boolean;
  onSignIn?: () => void;
};

export class Error404Page extends Block<Props, {}> {
  static componentName = 'Error404Page';

  constructor(props: Props) {
    super(props);

    this.setProps({
      onSignIn: () => this.onSignIn(),
    });
  }

  onSignIn() {
    this.props.router.go('/sign-in');
  }

  render() {
    return `
    <div class="form__wrapper">
      <div class="form form-error">

        <div class="form__top">
          {{{Title text="Error 404"}}}
          {{{Subtitle text="OOPS! Page not found!!"}}}
        </div>
        
        <div class="form__bottom">
          {{{Button text="Go back to Heylynx" onClick=onSignIn modifying="attraction"}}}
        </div>

      </div>
    </div>
    `;
  }
}

export default withRouter(withStore(withIsLoading(Error404Page)));

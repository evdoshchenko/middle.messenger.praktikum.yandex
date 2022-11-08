import { CoreRouter, Store, Block } from 'core';
import { withStore, withRouter, withIsLoading } from 'utils';

import './buttonBack.scss';
import IconBack from 'icons/back.png';

type Props = {
  router: CoreRouter;
  store: Store<AppState>;
  isLoading: boolean;
  onMessenger?: () => void;
};

class ButtonBack extends Block<Props> {
  static componentName = 'ButtonBack';

  constructor(props: Props) {
    super(props);

    this.setProps({
      onMessenger: () => this.onMessenger(),
    });
  }

  onMessenger() {
    this.props.router.go('/messenger');
  }

  protected render(): string {
    return `
      <div class="button-back__wrapper">
        <div class="button-back__button" >
          {{{Button text="Back" onClick=onMessenger circled=true source="${IconBack}"}}}
        </div>
      </div>
    `;
  }
}

const ComposedButtonBack = withRouter(withStore(withIsLoading(ButtonBack)));

export { ComposedButtonBack as ButtonBack };

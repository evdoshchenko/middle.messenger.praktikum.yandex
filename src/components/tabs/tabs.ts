import { CoreRouter, Store, Block } from 'core';
import { withStore, withRouter, withIsLoading } from 'utils';

import './tabs.scss';
import imgContacts from 'icons/contacts.png';
import imgChats from 'icons/chats.png';
import imgUser from 'icons/user.png';

type Props = {
  router: CoreRouter;
  store: Store<AppState>;
  isLoading: boolean;
  onProfile?: () => void;
};

class Tabs extends Block<Props> {
  static componentName = 'Tabs';

  constructor(props: Props) {
    super(props);

    this.setProps({
      onProfile: () => this.onProfile(),
    });
  }

  onProfile() {
    this.props.router.go('/profile');
  }

  protected render(): string {
    return `
      <div class="messenger__tabs">
        <div class="tabs__wrapper">
          {{{Button text="Profi" onClick=onProfile circled=true source="${imgContacts}"}}}
          {{{Button text="Profi" onClick=onProfile circled=true source="${imgChats}"}}}
          {{{Button text="Profi" onClick=onProfile circled=true source="${imgUser}"}}}
        </div>
      </div>
    `;
  }
}

const ComposedTabs = withRouter(withStore(withIsLoading(Tabs)));

export { ComposedTabs as Tabs };

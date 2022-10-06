import Block from 'core/Block';

import './tabs.scss';
import imgContacts from 'icons/contacts.png';
import imgChats from 'icons/chats.png';
import imgUser from 'icons/user.png';

type Props = {
};

export class Tabs extends Block<Props> {
  static componentName = 'Tabs';

  protected render(): string {
    return `
      <div class="messenger__tabs">
        <div class="tabs__wrapper">
          <div class="tabs__photo button-icons">
            <img src="${imgContacts}" alt="details" width="40px" height="40px"></img>
          </div>
          <div class="tabs__photo button-icons">
            <img src="${imgChats}" alt="details" width="40px" height="40px"></img>
          </div>
          <a href="../profile/profile.hbs">
            <div class="tabs__photo button-icons">
              <img src="${imgUser}" alt="details" width="40px" height="40px"></img>
            </div>
          </a>
        </div>
      </div>
    `;
  }
}

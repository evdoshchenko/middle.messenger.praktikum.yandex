import Block from 'core/Block';

import './contact.scss';
import imgDetails from 'icons/details.png';
import imgAvatar from 'images/avatars/cage.png';

type IncomingProps = {
  firstName?: string;
  secondName?: string;
};

type Props = IncomingProps & {
};

export class Contact extends Block<Props> {
  static componentName = 'Contact';

  constructor({ ...props }: IncomingProps) {
    super({ ...props });
    this.setProps({
      firstName: 'Nicolas',
      secondName: 'Cage',
    });
  }

  protected render(): string {
    return `
      <div class="messenger__contact">
        <div class="contact__wrapper">
          <div class="contact__data">
            <div class="contact__photo">
              <img src="${imgAvatar}" alt="contact-avatar" width="40px" height="40px"></img>
            </div>
            <div class="contact__name">
              <span>${this.props.firstName} ${this.props.secondName}</span>
            </div>
          </div>
          <div class="contact__details button-icons">
            <img src="${imgDetails}" alt="details" width="40px" height="40px"></img>
          </div>
        </div>
      </div>
    `;
  }
}

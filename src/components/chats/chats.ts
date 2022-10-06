import Block from 'core/Block';

import './chats.scss';
import imgExampleLeo from 'images/avatars/leo.png';
import imgExampleStevie from 'images/avatars/stevie.png';
import imgExampleBojack from 'images/avatars/bojack.png';
import imgExampleQuinn from 'images/avatars/quinn.png';
import imgExampleSheldon from 'images/avatars/sheldon.png';
import imgExampleCage from 'images/avatars/cage.png';

type IncomingProps = {
};

type Props = {
};

export class Chats extends Block<Props> {
  static componentName = 'Chats';

  constructor({ ...props }: IncomingProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
    <div class="messenger__chats">
      {{{ ChatsItem caption="Leo Di Caprio" photo="${imgExampleLeo}" last-text="🥳 How are you?" chats-time="15:34" counter="13"}}}
      {{{ ChatsItem classes="chats__wrapper_active" caption="Nicolas Cage" photo="${imgExampleCage}" last-text="I need a new role 😱" chats-time="08:23" counter="3"}}}
      {{{ ChatsItem caption="Stevie Wonder" photo="${imgExampleStevie}" last-text="Hi, how are you?" chats-time="23.12.22" counter="1"}}}
      {{{ ChatsItem caption="Sheldon Cooper" photo="${imgExampleSheldon}" last-text="Stevie?! Sarcasm? 🤯" chats-time="1.06.22" counter="1"}}}
      {{{ ChatsItem caption="BoJack Horseman" photo="${imgExampleBojack}" last-text="I'm fine!!!" chats-time="1.06.22" counter="1"}}}
      {{{ ChatsItem caption="Harley Quinn" photo="${imgExampleQuinn}" last-text="🤬🤬🤬" chats-time="23.12.22" counter="1"}}}
      {{{ ChatsItem caption="Sheldon Cooper" photo="${imgExampleSheldon}" last-text="Stevie?! Sarcasm? 🤯" chats-time="1.06.22" counter="1"}}}
      {{{ ChatsItem caption="BoJack Horseman" photo="${imgExampleBojack}" last-text="I'm fine!!!" chats-time="1.06.22" counter="1"}}}
      {{{ ChatsItem caption="Leo Di Caprio" photo="${imgExampleLeo}" last-text="🥳 How are you?" chats-time="15:34" counter="13"}}}
      {{{ ChatsItem caption="Nicolas Cage" photo="${imgExampleCage}" last-text="I need a new role 😱" chats-time="08:23" counter="3"}}}
      </div>
    `;
  }
}

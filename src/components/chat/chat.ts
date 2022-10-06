import Block from 'core/Block';

import './chat.scss';
import imgExample from 'images/404back.jpg';

type IncomingProps = {
};

type Props = {
};

export class Chat extends Block<Props> {
  static componentName = 'Chat';

  constructor({ ...props }: IncomingProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
      <div class="messenger__chat">
        {{{ ChatText type="in" text="The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested."}}}
        {{{ ChatImage type="in" link="${imgExample}" }}}
        {{{ ChatText type="out" text="Contrary to popular belief, Lorem Ipsum is not simply random text. 
          It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock"}}}
        {{{ ChatText type="in" text="Where can I get some?"}}}
        {{{ ChatText type="in" text="The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested."}}}
        {{{ ChatText type="in" text="Contrary to popular belief, Lorem Ipsum is not simply random text. 
          It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock"}}}
        {{{ ChatImage type="out" link="${imgExample}" }}}
        {{{ ChatText type="out" text="Where can I get some?"}}}
        {{{ ChatText type="in" text="The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested."}}}
      </div>
    `;
  }
}

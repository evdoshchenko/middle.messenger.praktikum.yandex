import Block from 'core/Block';

import './chatText.scss';

type IncomingProps = {
  text?: string;
  type?: string;
};

type Props = IncomingProps & {
};

export class ChatText extends Block<Props> {
  static componentName = 'ChatText';

  constructor({ ...props }: IncomingProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
      <div class="message-{{type}}__wrapper">
        {{text}}
      </div>
    `;
  }
}

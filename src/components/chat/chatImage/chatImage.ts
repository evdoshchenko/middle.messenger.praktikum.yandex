import Block from 'core/Block';

import './chatImage.scss';

type IncomingProps = {
  link?: string;
  type?: string;
  width?: string;
  height?: string;
};

type Props = IncomingProps & {
};

export class ChatImage extends Block<Props> {
  static componentName = 'ChatImage';

  constructor({ ...props }: IncomingProps) {
    super({ ...props });

    this.setProps({
      width: '400',
      height: '300',
    });
  }

  protected render(): string {
    return `
      <div class="photo-{{type}}__wrapper">
        <img src={{link}} width="{{width}}" height="{{height}}"></img>
      </div>
    `;
  }
}

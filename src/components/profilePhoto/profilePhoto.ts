import Block from 'core/Block';

import './profilePhoto.scss';

type IncomingProps = {
  name?: string;
  imglink?: string;
};

type Props = IncomingProps & {
};

export class ProfilePhoto extends Block<Props> {
  static componentName = 'ProfilePhoto';

  constructor({ name, imglink }: IncomingProps) {
    super({ name, imglink });
  }

  protected render(): string {
    return `
    <div class="photo">
      <img src={{imglink}} class="{{name}}" alt="{{name}}" width="40px" height="40px"></img>
    </div>  
    `;
  }
}

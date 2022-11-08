import { Block } from 'core';

import './profilePhoto.scss';

type IncomingProps = {
  name?: string;
  imglink?: string;
  disabled?: boolean;
};

type Props = IncomingProps;

export class ProfilePhoto extends Block<Props> {
  static componentName = 'ProfilePhoto';

  constructor({ name, imglink, disabled }: IncomingProps) {
    super({ name, imglink, disabled });
  }

  protected render(): string {
    return `
    <div class="photo">
      {{#if disabled}} 
        <img src={{imglink}} class="{{name}}" alt="{{name}}" width="40px" height="40px"></img>
      {{else}}
        <input id="avatar" class="inputfile" name="avatar" type="file"></input>
        <label for="avatar" class="label">Choose an avatar</label>
      {{/if}}
    </div>  
    `;
  }
}

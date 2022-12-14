import { Block } from 'core';

import './title.scss';

type IncomingProps = {
  text?: string;
};

type Props = IncomingProps;

export class Title extends Block<Props> {
  static componentName = 'Title';

  constructor({ text }: IncomingProps) {
    super({ text });
  }

  protected render(): string {
    return `
      <h1 class="title">{{text}}</h1>
    `;
  }
}

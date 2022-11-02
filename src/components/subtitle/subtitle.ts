import { Block } from 'core';

import './subtitle.scss';

type IncomingProps = {
  text?: string;
};

type Props = IncomingProps;

export class Subtitle extends Block<Props> {
  static componentName = 'Subtitle';

  constructor({ text }: IncomingProps) {
    super({ text });
  }

  protected render(): string {
    return `
      <span class="subtitle">{{text}}</span>
    `;
  }
}

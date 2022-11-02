import { Block } from 'core';

import './link.scss';

type IncomingProps = {
  onClick?: () => void;
  text?: string;
  to?: string;
};

type Props = {
  text?: string;
  to?: string;
  events?: {
    click?: (e: MouseEvent) => void;
  }
};

export class Link extends Block<Props> {
  static componentName = 'Link';

  constructor({
    text, to, onClick,
  }: IncomingProps) {
    super({ text, to, events: { click: onClick } });
  }

  render() {
    return `
      <a href='{{to}}'>{{text}}</a>
    `;
  }
}

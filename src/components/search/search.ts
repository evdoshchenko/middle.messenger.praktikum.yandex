import { Block } from 'core';
import { validating } from 'helpers';
import { Input } from '../input';
import { ButtonSend } from '../buttonSend';

import './search.scss';

type IncomingProps = {
  name?: string;
  placeholder?: string;
};

type Props = IncomingProps & {
  onInput?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onSubmit?: (e: FocusEvent) => void;
  sendable?: boolean;
};

type Refs = {
  inputRef: Input;
  buttonSendRef: ButtonSend;
};

export class Search extends Block<Props, Refs> {
  static componentName = 'Search';

  constructor({ ...props }: IncomingProps) {
    super({ ...props });

    this.setProps({
      sendable: true,
      onFocus: (e: FocusEvent) => {
        validating(e, this.refs);
      },
      onInput: (e: FocusEvent) => {
        validating(e, this.refs);
      },
      onBlur: (e: FocusEvent) => {
        e.preventDefault();
      },
      onSubmit: (e: FocusEvent) => {
        e.preventDefault();
        console.log((this.refs.inputRef.getContent() as HTMLInputElement).value);
      },
    });
  }

  protected render(): string {
    return `
    <div class="messenger__search">
      <div class="search__wrapper">

        {{{Input
          name="search"
          type="text"
          validateType="Email"
          placeholder="Search"
          onInput=onInput
          onFocus=onFocus
          onBlur=onBlur
          modifying="search"
          ref="inputRef" 
        }}}
        {{{ButtonSend ref="buttonSendRef" onClick=onSubmit sendable="{{sendable}}" }}}

      </div>
    </div>
    `;
  }
}

import { Block } from 'core';

import './input.scss';

type IncomingProps = {
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeypress?: () => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  name?: string;
  label?: string;
  value?: string;
  disabled?: boolean;
};

type Props = {
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  name?: string;
  label?: string;
  value?: string;
  disabled?: boolean;
  events?: {
    input?: () => void;
    focus?: () => void;
    blur?: () => void;
    keypress?: () => void;
  }
};

export class Input extends Block<Props> {
  static componentName = 'Input';

  constructor({
    onInput, onFocus, onBlur, onKeypress, ...props
  }: IncomingProps) {
    super({
      ...props,
      events: {
        input: onInput, focus: onFocus, blur: onBlur, keypress: onKeypress,
      },
    });
  }

  protected render(): string {
    return `
      <input 
        name="{{name}}" 
        class="input{{#if modifying}}-{{modifying}}{{/if}}" 
        type="{{type}}" 
        {{#if disabled}}disabled{{/if}} 
        placeholder="{{placeholder}}" 
        value="{{value}}">
    `;
  }
}

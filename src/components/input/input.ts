import Block from 'core/Block';

import './input.scss';

type IncomingProps = {
  onInput?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  name?: string;
  label?: string;
  value?: string;
};

type Props = {
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  name?: string;
  label?: string;
  value?: string;
  events?: {
    input?: () => void;
    focus?: () => void;
    blur?: () => void;
  }
};

export class Input extends Block<Props> {
  static componentName = 'Input';

  constructor({
    onInput, onFocus, onBlur, ...props
  }: IncomingProps) {
    super({
      ...props, events: { input: onInput, focus: onFocus, blur: onBlur },
    });
  }

  protected render(): string {
    return `
        <input 
          name="{{name}}" 
          class="input{{#if modifying}}-{{modifying}}{{/if}}" 
          type="{{type}}" 
          {{#if disabled}}{{disabled}}{{/if}} 
          placeholder="{{placeholder}}" 
          value="">
    `;
  }
}

import Block from 'core/Block';
import { validateForm } from 'helpers/validateForm';
import { ValidateType } from 'helpers/types';
import { debounce } from 'helpers/debounce';

import Input from '../input';
import InputError from '../inputError';

import './controlledInput.scss';

type IncomingProps = {
  type?: 'text' | 'password' | 'email';
  validateType?: ValidateType;
  placeholder?: string;
  value?: string;
  error?: string;
  name?: string;
  label?: string;
  modifying?: string;
  disabled?: boolean;
};

type Props = IncomingProps & {
  onInput?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
};

type Refs = {
  inputRef: Input;
  errorRef: InputError;
};

export class ControlledInput extends Block<Props, Refs> {
  static componentName = 'ControlledInput';

  constructor({ ...props }: IncomingProps) {
    super({ ...props });

    this.setProps({
      onFocus: (e: FocusEvent) => {
        if ((e.target as HTMLInputElement).value) {
          this.validating(e);
        }
      },
      onInput: (e: FocusEvent) => {
        debounce(() => this.validating(e), 2000)();
      },
      onBlur: (e: FocusEvent) => {
        this.validating(e);
      },
    });
  }

  validating(e: FocusEvent) {
    const inputEl = e.target as HTMLInputElement;
    const typeEl = this.props.validateType as ValidateType;
    const error = validateForm([
      { type: typeEl, value: inputEl.value },
    ]);

    this.refs.errorRef.setProps({
      text: error,
      submitted: false,
    });
  }

  protected render(): string {
    return `
      <div class="wrapper">       
        <div class="controlled-{{#if modifying}}{{modifying}}-{{/if}}input">
          <label class="{{#if modifying}}{{modifying}}-{{/if}}caption">
            {{label}}:
          </label>
          {{{Input
            name="{{name}}"
            type="{{type}}"
            placeholder="{{placeholder}}"
            onInput=onInput
            onFocus=onFocus
            onBlur=onBlur
            modifying="{{modifying}}"
            disabled=disabled
            ref="inputRef" 
          }}}
        </div>
        {{{InputError ref="errorRef" name="{{name}}" text=error modifying="{{modifying}}"}}}
      </div>
    `;
  }
}

import Block from 'core/Block';

import './inputError.scss';

type IncomingProps = {
  text?: string;
  submitted?: boolean;
};

type Props = IncomingProps;

export default class InputError extends Block<Props> {
  static componentName = 'InputError';

  constructor({ ...props }: IncomingProps) {
    super({ ...props });
  }

  protected render(): string {
    return `
      <div 
        class="
          {{#if modifying}}{{modifying}}-{{/if}}input-error 
          input-error 
          {{#if submitted}}submitted{{/if}}" 
        name={{name}}
        >
        {{#if text}}{{text}}{{/if}}
      </div>
    `;
  }
}

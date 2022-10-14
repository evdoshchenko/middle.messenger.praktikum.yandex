import Block from 'core/Block';
import imgAdd from 'icons/add.png';
import validating from 'helpers/validating';
import Input from '../input';
import ButtonSend from '../buttonSend';

import './message.scss';

type Props = {
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

export class Message extends Block<Props, Refs> {
  static componentName = 'Message';

  constructor() {
    super();

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
        // Пока больше некуда выводить для проверки рабоспособности. Я по ТЗ и для инпута добавил:
        // "Сделайте сбор данных из формы. В console.log должен выводиться объект со всеми заполненными полями формы."
        console.log((this.refs.inputRef.getContent() as HTMLInputElement).value);
      },
    });
  }

  protected render(): string {
    return `
      <div class="messenger__message">
        <div class="message__wrapper">
          <div class="message__add button-icons">
            <img src="${imgAdd}" alt="details" width="40px" height="40px"></img>
          </div>
          {{{Input
            name="message"
            type="text"
            validateType="Email"
            placeholder="Write a message..."
            onInput=onInput
            onFocus=onFocus
            onBlur=onBlur
            modifying="message"
            ref="inputRef" 
          }}}
          {{{ButtonSend ref="buttonSendRef" onClick=onSubmit sendable="{{sendable}}" }}}
        </div>
      </div>
    `;
  }
}

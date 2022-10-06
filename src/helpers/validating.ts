import Block from 'core/Block';

export default function validating(e: FocusEvent, refs: { [key: string]: Block<{}> }) {
  e.preventDefault();
  const inputEl = e.target as HTMLInputElement;
  const { value } = inputEl;
  if (value) {
    refs.buttonSendRef.setProps({
      sendable: false,
    });
  } else if (!value) {
    refs.buttonSendRef.setProps({
      sendable: true,
    });
  }
}

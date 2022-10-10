import { validateForm } from 'helpers/validateForm';
import { ValidateType } from 'helpers/types';
import Block from 'core/Block';

export function validatingSubmit(refs: { [key: string]: Block<{}> }) {
  const refsArray = Object.entries(refs);

  refsArray.forEach((ref: any) => {
    if (ref[0].includes('Input')) {
      const input = ref[1].refs.inputRef.getContent();
      const type = ref[1].props.validateType as ValidateType;
      const error = validateForm([
        { type, value: input.value },
      ]);
      ref[1].refs.errorRef.setProps({
        text: error,
        submitted: true,
      });
    }
  });
}

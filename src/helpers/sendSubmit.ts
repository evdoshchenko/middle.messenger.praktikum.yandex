export function sendSubmit() {
  let problems: boolean = false;
  const errors: any = document.querySelectorAll('.input-error');
  const errorsArray = Array.from(errors) as Array<HTMLElement>;

  for (let i = 0; i < errorsArray.length; i += 1) {
    if (errorsArray[i].outerText) {
      problems = true;
    }
  }

  if (!problems) {
    const inputs = document.getElementsByTagName('input');
    const inputsArray = Array.from(inputs) as Array<HTMLInputElement>;
    const values: any = {};
    for (let i = 0; i < inputsArray.length; i += 1) {
      if (inputsArray[i].value) {
        values[inputsArray[i].name] = inputsArray[i].value;
      }
    }
    return values;
  }
}

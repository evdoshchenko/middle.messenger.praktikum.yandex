import { ValidateType, regExps, errorsDescriptions } from 'helpers';

type ValidateRule = {
  type: ValidateType;
  value: string;
};

function findType(obj: {}, type: ValidateType) {
  return Object
    .entries(obj)
    .filter(([key]) => key === type)
    .flat()[1];
}

export function validateForm(rules: ValidateRule[]): string | undefined {
  for (let i = 0; i < rules.length; i += 1) {
    const { type, value } = rules[i];
    if (!(findType(regExps, type) as RegExp).test(value)) {
      return (findType(errorsDescriptions, type) as string);
    }
  }
}

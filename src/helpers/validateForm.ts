import { regExps } from './regExps';
import { errorsDescriptions } from './errorsDescriptions';

export enum ValidateType {
  Login = 'Login',
  Password = 'Password',
  Email = 'Email',
  Phone = 'Phone',
  FirstName = 'FirstName',
  SecondName = 'SecondName',
  DisplayName = 'SecondName',
  Message = 'Message',
}

type ValidateRule = {
  type: ValidateType;
  value: string;
};

export function validateForm(rules: ValidateRule[]): string | undefined {
  for (let i = 0; i < rules.length; i += 1) {
    const { type, value } = rules[i];
    const regExp = Object.entries(regExps).filter(([key]) => key === type).flat()[1] as RegExp;
    if (!regExp.test(value)) {
      const errorsDescription = Object.entries(errorsDescriptions).filter(([key]) => key === type).flat()[1] as string;
      return errorsDescription;
    }
  }
}

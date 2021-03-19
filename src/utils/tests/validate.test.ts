import validate from '@/utils/validators/validate';
import { checkFormField } from '@/utils/validators/checkFormField';

describe('validate', () => {
  interface IMockModel {
    name: string;
    email: string;
  }

  const validateFn = (v:IMockModel) => (
    validate<IMockModel>({
      name: [checkFormField.requiredField(v.name)],
      email: [checkFormField.requiredField(v.email), checkFormField.email(v.email)],
    })
  );

  it('validates right data', () => {
    expect(validateFn({
      name: 's',
      email: 'some@ya.ru',
    })).toBeTruthy();
  });

  it('not validates wrong data', () => {
    expect(validateFn({
      name: 'S',
      email: 's@',
    })).toHaveProperty('email');
  });
});

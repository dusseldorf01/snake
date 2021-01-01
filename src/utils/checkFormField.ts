import isRequired from '@/utils/isRequired';
import isEmail from '@/utils/isEmail';
import isPhone from '@/utils/isPhone';
import areEqualPasswords from '@/utils/areEqualPasswords';

type CheckFunctionType = (str:string) => () => string;
type CheckEqualFunction = (str:string, str2:string) => () => string;
interface CheckFunctionsMap {
  email: CheckFunctionType,
  phone: CheckFunctionType
  requiredField: CheckFunctionType,
  passwordRepeat: CheckEqualFunction,
}

const alert = {
  required: 'Обязательное поле',
  email: 'Укажите валидный email',
  phone: 'Укажите телефон в формате +7 XXX XXX XXXX',
  passwordRepeat: 'Введенные пароли не совпадают',
};

const checkFormField:CheckFunctionsMap = {
  email: (email:string) => () => (isEmail(email) ? '' : alert.email),
  phone: (phone:string) => () => (isPhone(phone) ? '' : alert.phone),
  passwordRepeat: (password:string, passwordRepeat:string) => () => (areEqualPasswords(password, passwordRepeat) ? '' : alert.passwordRepeat),
  requiredField: (fieldText:string) => () => (isRequired(fieldText) ? '' : alert.required),
};

/* eslint-disable import/prefer-default-export */
export { checkFormField };

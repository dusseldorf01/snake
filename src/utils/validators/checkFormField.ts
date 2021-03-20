import isRequired from '@/utils/validators/isRequired';
import isEmail from '@/utils/validators/isEmail';
import isPhone from '@/utils/validators/isPhone';
import areEqualPasswords from '@/utils/validators/areEqualPasswords';
import isFileSizeSmaller from '@/utils/validators/isFileSizeSmaller';

type CheckFunctionType = (str:string) => () => string;
type CheckEqualFunction = (str:string, str2:string) => () => string;
type CheckInputFileSize = (input:HTMLInputElement) => () => string;
interface CheckFunctionsMap {
  avatar: CheckInputFileSize,
  email: CheckFunctionType,
  phone: CheckFunctionType
  requiredField: CheckFunctionType,
  passwordRepeat: CheckEqualFunction,
  newPassword: CallableFunction,
}

const AVATAR_MAX_FILE_SIZE_MB = 2;

const alert = {
  required: 'Обязательное поле',
  email: 'Укажите валидный email',
  phone: 'Укажите телефон в формате +7 XXX XXX XXXX',
  passwordRepeat: 'Введенные пароли не совпадают',
  avatar: `Размер файла не может превышать ${AVATAR_MAX_FILE_SIZE_MB} Мб`,
  newPassword: 'Необходимо ввести старый пароль',
};

const checkFormField:CheckFunctionsMap = {
  avatar: (fileInput) => () => (isFileSizeSmaller(fileInput, AVATAR_MAX_FILE_SIZE_MB) ? '' : alert.avatar),
  email: (email:string) => () => (isEmail(email) ? '' : alert.email),
  phone: (phone:string) => () => (isPhone(phone) ? '' : alert.phone),
  passwordRepeat: (password:string, passwordRepeat:string) => () => (areEqualPasswords(password, passwordRepeat) ? '' : alert.passwordRepeat),
  requiredField: (fieldText:string) => () => (isRequired(fieldText) ? '' : alert.required),
  // eslint-disable-next-line no-nested-ternary
  newPassword: (newPass:string, oldPass:string) => () => (newPass === '' ? '' : oldPass !== '' ? '' : alert.newPassword),
};

/* eslint-disable import/prefer-default-export */
export { checkFormField };

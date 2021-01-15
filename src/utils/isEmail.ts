export default (str: string) => () => {
  if (!(/^\S+@\S+$/.test(str))) {
    return 'Укажите валидный email';
  }
  return '';
};

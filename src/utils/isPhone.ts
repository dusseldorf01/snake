export default (str: string) => () => {
  if (!(/^((8|\+7)[- ]?)?((\d{3})?[- ]?)?[\d- ]{7,10}$/.test(str))) {
    return 'Укажите телефон в формате +7 XXX XXX XXXX';
  }
  return '';
};

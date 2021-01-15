export default (str: string) => () => {
  if (str === '') {
    return 'Обязательное поле';
  }
  return '';
};

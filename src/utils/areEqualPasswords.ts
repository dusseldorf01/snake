export default (p1: string, p2: string) => () => {
  if (p1 !== p2) {
    return 'Введенные пароли не совпадают';
  }
  return '';
};

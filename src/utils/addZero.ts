export default (number: number): string => {
  if (number < 10) {
    return `0${number}`;
  }
  return String(number);
};

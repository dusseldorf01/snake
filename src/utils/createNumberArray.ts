export default (length: number): number[] => {
  const res = [];

  for (let i = 1; i <= length; i += 1) {
    res.push(i);
  }

  return res;
};

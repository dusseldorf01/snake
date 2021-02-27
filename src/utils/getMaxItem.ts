export default (arr: number[]): number => {
  let max = arr[0];

  for (let i = 1; i < arr.length; i += 1) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  return max;
};

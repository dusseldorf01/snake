import areEqualArrays from '@/utils/areEqualArrays';

describe('areEqualArrays', () => {
  it('checking equal arrays', () => {
    const arr1 = [1, 2, 3, 'abc'];
    const arr2 = [1, 2, 3, 'abc'];

    expect(areEqualArrays(arr1, arr2)).toBeTruthy();
  });

  describe('checking not equal arrays', () => {
    it('checking arrays of different length', () => {
      const arr1 = [1, 2, 3, 4, 5];
      const arr2 = [1, 2, 3];

      expect(areEqualArrays(arr1, arr2)).toBeFalsy();
    });
    it('checking arrays of different content', () => {
      const arr1 = [1, 2, 3, 4];
      const arr2 = [1, 2, 3, 5];

      expect(areEqualArrays(arr1, arr2)).toBeFalsy();
    });
  });
});

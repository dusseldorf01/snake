import getMaxItem from '@/utils/getMaxItem';

describe('getMaxItem', () => {
  it('returns max item', () => {
    const arr = [1, -3, 10, 9, 10, 11, 5];

    expect(getMaxItem(arr)).toBe(11);
  });
});

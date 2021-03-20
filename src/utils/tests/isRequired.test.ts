import isRequired from '@/utils/validators/isRequired';

describe('isRequired', () => {
  it('checking right value', () => {
    expect(isRequired('1')).toBeTruthy();
  });
  it('checking wrong value', () => {
    expect(isRequired('')).toBeFalsy();
  });
});

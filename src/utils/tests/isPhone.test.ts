import isPhone from '@/utils/validators/isPhone';

describe('isPhone', () => {
  it('checking right phone', () => {
    expect(isPhone('81111231231')).toBeTruthy();
    expect(isPhone('+7-111-123-12-32')).toBeTruthy();
    expect(isPhone('+71111231231')).toBeTruthy();
    expect(isPhone('8-111-123-12-13')).toBeTruthy();
  });

  it('checking wrong phone', () => {
    expect(isPhone('81111a231')).toBeFalsy();
    expect(isPhone('a b c')).toBeFalsy();
  });
});

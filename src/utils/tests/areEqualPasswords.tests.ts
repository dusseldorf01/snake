import areEqualPasswords from '@/utils/validators/areEqualPasswords';

describe('areEqualPasswords', () => {
  it('checking equal passwords', () => {
    const password = 'test124!!!';
    expect(areEqualPasswords(password, password)).toBeTruthy();
  });

  it('checking different string values', () => {
    expect(areEqualPasswords('test123', 'test124')).toBeFalsy();
  });
});

import isEmail from '@/utils/isEmail';

describe('isEmail', () => {
  it('checking right email', () => {
    expect(isEmail('test@ya.ru')).toBeTruthy();
  });

  it('checking wrong email', () => {
    expect(isEmail('string')).toBeFalsy();
  });

  it('checking email with space', () => {
    expect(isEmail('test@ya .ru')).toBeFalsy();
  });
});

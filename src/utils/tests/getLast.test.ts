import getLast from '@/utils/getLast';

it('getLast', () => {
  const arr = ['aa', 'bb', 'cc'];

  expect(getLast(arr)).toBe('cc');
});

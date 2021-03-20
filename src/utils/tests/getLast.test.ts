import getLast from '@/utils/getLast';

describe('getLast', () => {
  it('returns last item', () => {
    const arr = ['aa', 'bb', 'cc'];

    expect(getLast(arr)).toBe('cc');
  });
});

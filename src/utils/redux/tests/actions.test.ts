import { createAsyncActions } from '@/utils/redux/actions';

describe('createAction', () => {
  const type = 'SOME_FETCH';
  const asyncActions = createAsyncActions(type);

  it('should create object with async actions', () => {
    expect(asyncActions.request.toString()).toEqual(`${type}_REQUEST`);
    expect(asyncActions.success.toString()).toEqual(`${type}_SUCCESS`);
    expect(asyncActions.error.toString()).toEqual(`${type}_ERROR`);
    expect(asyncActions.clear.toString()).toEqual(`${type}_CLEAR`);
  });
});

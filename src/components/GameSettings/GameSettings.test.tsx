import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import * as reactRedux from 'react-redux';
import { GameReducerType } from '@/game/interfaces';
import ReduxTestWrapper from '@/utils/testWrapper';
import GameSettings from './index';

describe('GameSettings', () => {
  const dispatchMock = jest.fn();

  const spyUseDispatch = jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => dispatchMock);

  beforeEach(() => {
    dispatchMock.mockReset();
  });

  afterAll(() => {
    spyUseDispatch.mockRestore();
  });

  it('checking selecting map', () => {
    render(
      <ReduxTestWrapper initialState={{ game: { map: 2 } }}>
        <GameSettings />
      </ReduxTestWrapper>,
    );

    const select = document.querySelector('[name="map"]') as HTMLSelectElement;

    expect(select.value).toBe('2');

    fireEvent.change(select, { target: { value: '0' } });

    expect(dispatchMock).toBeCalledWith({ type: GameReducerType.CHANGE_MAP, payload: 0 });
  });

  it('checking changing level', () => {
    render(
      <ReduxTestWrapper initialState={{ game: { level: 3 } }}>
        <GameSettings />
      </ReduxTestWrapper>,
    );

    const input = document.querySelector('[name="level"]') as HTMLInputElement;

    expect(input.value).toBe('3');

    fireEvent.change(input, { target: { value: '1' } });

    expect(dispatchMock).toBeCalledWith({ type: GameReducerType.CHANGE_LEVEL, payload: 1 });
  });

  it('checking changing increasing level', () => {
    render(
      <ReduxTestWrapper initialState={{ game: { changingLevel: true } }}>
        <GameSettings />
      </ReduxTestWrapper>,
    );

    const input = document.querySelector('[name="changingLevel"]') as HTMLInputElement;

    expect(input.checked).toBeTruthy();

    fireEvent.click(screen.getByText('Увеличивать уровень'));

    expect(dispatchMock).toBeCalledWith({
      type: GameReducerType.CHANGE_CHANGING_LEVEL,
      payload: false,
    });
  });

  it('checking multiplayer', () => {
    render(
      <ReduxTestWrapper initialState={{ game: { multiplayer: true } }}>
        <GameSettings />
      </ReduxTestWrapper>,
    );

    const input = document.querySelector('[name="multiplayer"]') as HTMLInputElement;

    expect(input.checked).toBeTruthy();

    fireEvent.click(screen.getByText('Мультиплеер'));

    expect(dispatchMock).toBeCalledWith({
      type: GameReducerType.CHANGE_MULTIPLAYER,
      payload: false,
    });
  });
});

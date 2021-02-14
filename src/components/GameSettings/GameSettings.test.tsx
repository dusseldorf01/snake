import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { GameReducerType } from '@/game/interfaces';
import GameSettings from './index';

describe('GameSettings', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockReset();
  });

  it('checking selecting map', () => {
    render(
      <GameSettings
        changingLevel
        dispatch={dispatch}
        level={3}
        map={2}
        multiplayer
      />,
    );

    const select = document.querySelector('[name="map"]') as HTMLSelectElement;

    expect(select.value).toBe('2');

    fireEvent.change(select, { target: { value: '0' } });

    expect(dispatch).toBeCalledWith({ type: GameReducerType.CHANGE_MAP, payload: 0 });
  });

  it('checking changing level', () => {
    render(
      <GameSettings
        changingLevel
        dispatch={dispatch}
        level={3}
        map={2}
        multiplayer
      />,
    );

    const input = document.querySelector('[name="level"]') as HTMLInputElement;

    expect(input.value).toBe('3');

    fireEvent.change(input, { target: { value: '1' } });

    expect(dispatch).toBeCalledWith({ type: GameReducerType.CHANGE_LEVEL, payload: 1 });
  });

  it('checking changing increasing level', () => {
    render(
      <GameSettings
        changingLevel
        dispatch={dispatch}
        level={3}
        map={2}
        multiplayer
      />,
    );

    const input = document.querySelector('[name="changingLevel"]') as HTMLInputElement;

    expect(input.checked).toBeTruthy();

    fireEvent.click(screen.getByText('Увеличивать уровень'));

    expect(dispatch).toBeCalledWith({
      type: GameReducerType.CHANGE_CHANGING_LEVEL,
      payload: false,
    });
  });

  it('checking multiplayer', () => {
    render(
      <GameSettings
        changingLevel
        dispatch={dispatch}
        level={3}
        map={2}
        multiplayer
      />,
    );

    const input = document.querySelector('[name="multiplayer"]') as HTMLInputElement;

    expect(input.checked).toBeTruthy();

    fireEvent.click(screen.getByText('Мультиплеер'));

    expect(dispatch).toBeCalledWith({
      type: GameReducerType.CHANGE_MULTIPLAYER,
      payload: false,
    });
  });
});

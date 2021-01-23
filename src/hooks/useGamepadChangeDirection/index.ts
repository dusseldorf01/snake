import { useEffect } from 'react';
import type { IUseGamepadChangeDirection } from '@/hooks/useGamepadChangeDirection/interfaces';
import { IGamepadKeyMap, IActualGamepadKeyMap } from '@/hooks/useGamepadChangeDirection/keyMap/interfaces';
import type { GamepadStick, GamepadButton } from '@/hooks/useGamepadChangeDirection/keyMap/interfaces';
import { GameReducerType } from '@/game/interfaces';
import { Direction } from '@/lib/Painter/interfaces';
import xboxKeyMap from '@/hooks/useGamepadChangeDirection/keyMap/xboxKeyMap';

const useGamepadChangeDirection = ({
  dispatch,
  number,
  status,
  trueCondition,
}: IUseGamepadChangeDirection) => {
  const setKeysFromMap = (map:IGamepadKeyMap, gamepad:Gamepad) => {
    const actualKeys:IActualGamepadKeyMap = {};
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in map) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      ((key).indexOf('stick') === 0)
        ? actualKeys[key] = gamepad.axes[map[key]]
        : actualKeys[key] = gamepad.buttons[map[key]];
    }
    return actualKeys;
  };

  const checkButtons = (up?:GamepadButton, down?:GamepadButton,
    left?:GamepadButton, right?:GamepadButton) => {
    if (up && down && left && right) {
      if (up.pressed) {
        dispatch({
          payload: {
            dir: Direction.TOP,
            number,
          },
          type: GameReducerType.CHANGE_DIRECTION,
        });
      } else
      if (down.pressed) {
        dispatch({
          payload: {
            dir: Direction.BOTTOM,
            number,
          },
          type: GameReducerType.CHANGE_DIRECTION,
        });
      } else
      if (left.pressed) {
        dispatch({
          payload: {
            dir: Direction.LEFT,
            number,
          },
          type: GameReducerType.CHANGE_DIRECTION,
        });
      } else
      if (right.pressed) {
        dispatch({
          payload: {
            dir: Direction.RIGHT,
            number,
          },
          type: GameReducerType.CHANGE_DIRECTION,
        });
      }
    }
  };

  const checkStick = (stickX:GamepadStick = 0, stickY:GamepadStick = 1) => {
    if (stickX > 0.5) {
      dispatch({
        payload: {
          dir: Direction.RIGHT,
          number,
        },
        type: GameReducerType.CHANGE_DIRECTION,
      });
    } else
    if (stickX < -0.5) {
      dispatch({
        payload: {
          dir: Direction.LEFT,
          number,
        },
        type: GameReducerType.CHANGE_DIRECTION,
      });
    } else
    if (stickY > 0.5) {
      dispatch({
        payload: {
          dir: Direction.BOTTOM,
          number,
        },
        type: GameReducerType.CHANGE_DIRECTION,
      });
    } else
    if (stickY < -0.5) {
      dispatch({
        payload: {
          dir: Direction.TOP,
          number,
        },
        type: GameReducerType.CHANGE_DIRECTION,
      });
    }
  };

  useEffect(() => {
    if (!trueCondition) {
      return;
    }

    let interval:number;

    const listener = () => {
      if (interval) return;
      interval = window.setInterval(() => {
        const gamepad = navigator.getGamepads()[0];
        if (!gamepad) return;
        const {
          stickX, stickY, up, down, left, right,
        } = setKeysFromMap(xboxKeyMap, gamepad);
        checkButtons(up, down, left, right);
        checkStick(stickX, stickY);
      }, 100);
    };

    if (navigator.getGamepads()[0]) listener();
    window.addEventListener('gamepadconnected', listener);
    window.addEventListener('gamepaddisconnected', () => { window.clearInterval(interval); });

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('gamepadconnected', listener);
      window.removeEventListener('gamepaddisconnected', () => { window.clearInterval(interval); });
      window.clearInterval(interval);
    };
  }, [status]);
};

export default useGamepadChangeDirection;

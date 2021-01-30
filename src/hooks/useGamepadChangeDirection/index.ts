import { useEffect } from 'react';
import type { IUseGamepadChangeDirection } from '@/hooks/useGamepadChangeDirection/interfaces';
import { IGamepadKeyMap, IActualGamepadKeyMap } from '@/hooks/useGamepadChangeDirection/keyMap/interfaces';
import type { GamepadStick, GamepadButton } from '@/hooks/useGamepadChangeDirection/keyMap/interfaces';
import gameActions from '@/game/actionCreators';
import xboxKeyMap from '@/hooks/useGamepadChangeDirection/keyMap/xboxKeyMap';

const {
  goToBottom,
  goToLeft,
  goToRight,
  goToTop,
} = gameActions;

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
        dispatch(goToTop(number));
      } else
      if (down.pressed) {
        dispatch(goToBottom(number));
      } else
      if (left.pressed) {
        dispatch(goToLeft(number));
      } else
      if (right.pressed) {
        dispatch(goToRight(number));
      }
    }
  };

  const checkStick = (stickX:GamepadStick = 0, stickY:GamepadStick = 1) => {
    if (stickX > 0.5) {
      dispatch(goToRight(number));
    } else
    if (stickX < -0.5) {
      dispatch(goToLeft(number));
    } else
    if (stickY > 0.5) {
      dispatch(goToBottom(number));
    } else
    if (stickY < -0.5) {
      dispatch(goToTop(number));
    }
  };

  useEffect(() => {
    if (!trueCondition) {
      return;
    }

    let animationFrame:number;

    const listener = () => {
      const gamepad = navigator.getGamepads()[0];
      if (!gamepad) return;
      const {
        stickX, stickY, up, down, left, right,
      } = setKeysFromMap(xboxKeyMap, gamepad);
      checkButtons(up, down, left, right);
      checkStick(stickX, stickY);
      animationFrame = window.requestAnimationFrame(listener);
    };

    if (navigator.getGamepads()[0]) listener();
    window.addEventListener('gamepadconnected', listener);
    window.addEventListener('gamepaddisconnected', () => { window.cancelAnimationFrame(animationFrame); });

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('gamepadconnected', listener);
      window.removeEventListener('gamepaddisconnected', () => { window.cancelAnimationFrame(animationFrame); });
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [status]);
};

export default useGamepadChangeDirection;

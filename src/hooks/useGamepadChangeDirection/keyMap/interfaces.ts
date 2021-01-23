type GamepadButton = {
  pressed:boolean,
  touched:boolean,
  [key:string]:any,
};

type GamepadStick = number;

interface IActualGamepadKeyMap {
  stickX?: GamepadStick,
  stickY?: GamepadStick,
  up?: GamepadButton,
  down?: GamepadButton,
  left?:GamepadButton,
  right?:GamepadButton,
  [key:string]: any
}

interface IGamepadKeyMap {
  stickX: number,
  stickY: number,
  up: number,
  down: number,
  left: number,
  right: number,
  [key:string]: any
}

export {
  IActualGamepadKeyMap, IGamepadKeyMap, GamepadStick, GamepadButton,
};

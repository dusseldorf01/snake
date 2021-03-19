/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import type { IGameState } from '@/game/interfaces';
import {
  ateBigFood,
  ateFood,
  changeChangingLevel,
  changeGameStatus,
  changeLevel,
  changeMap,
  changeMultiplayer,
  goToBottom,
  goToLeft,
  goToRight,
  goToTop,
  restartGame,
  setLastDirection,
  setSnake,
  setState,
  updateBigFood,
} from '@/actions/game';
import changeDirection from '@/utils/game/changeDirection';
import changeMapHandler from '@/utils/game/changeMap';
import changeMultiplayerHandler from '@/utils/game/changeMultiplayer';
import { Direction } from '@/lib/Painter/interfaces';
import getInitialGameState from '@/utils/game/getInitialGameState';
import createGameState from '@/utils/game/createGameState';
import gameConfig from '@/game/config';

const { BIG_FOOD_POINTS } = gameConfig;

const gameReducer = createReducer<IGameState>(getInitialGameState(), (builder) => {
  builder
    .addCase(ateBigFood, (state, action) => {
      state.score[action.payload] += BIG_FOOD_POINTS;
    })
    .addCase(ateFood, (state, action) => {
      state.food = action.payload.newFood;
      state.score[action.payload.index] += 1;
    })
    .addCase(changeChangingLevel, (state, action) => {
      state.changingLevel = action.payload;
    })
    .addCase(changeGameStatus, (state, action) => {
      state.status = action.payload;
    })
    .addCase(changeLevel, (state, action) => {
      state.level = action.payload;
    })
    .addCase(changeMap, (state, action) => {
      changeMapHandler(state, action.payload);
    })
    .addCase(changeMultiplayer, (state, action) => {
      changeMultiplayerHandler(state, action.payload);
    })
    .addCase(goToBottom, (state, action) => {
      changeDirection(Direction.Bottom, Direction.Top, action.payload, state);
    })
    .addCase(goToLeft, (state, action) => {
      changeDirection(Direction.Left, Direction.Right, action.payload, state);
    })
    .addCase(goToRight, (state, action) => {
      changeDirection(Direction.Right, Direction.Left, action.payload, state);
    })
    .addCase(goToTop, (state, action) => {
      changeDirection(Direction.Top, Direction.Bottom, action.payload, state);
    })
    .addCase(restartGame, (state) => {
      createGameState(state);
    })
    .addCase(setLastDirection, (state, action) => {
      state.lastDirection[action.payload] = state.direction[action.payload];
    })
    .addCase(setSnake, (state, action) => {
      state.snake[action.payload.index] = action.payload.snake;
    })
    .addCase(setState, (state, action) => {
      state.bigFood = action.payload.bigFood;
      state.changingLevel = action.payload.changingLevel;
      state.direction = action.payload.direction;
      state.food = action.payload.food;
      state.lastDirection = action.payload.lastDirection;
      state.level = action.payload.level;
      state.map = action.payload.map;
      state.multiplayer = action.payload.multiplayer;
      state.score = action.payload.score;
      state.snake = action.payload.snake;
      state.startLevel = action.payload.startLevel;
      state.status = action.payload.status;
      state.timeToRemoveBigFood = action.payload.timeToRemoveBigFood;
    })
    .addCase(updateBigFood, (state, action) => {
      state.bigFood = action.payload.bigFood;
      state.timeToRemoveBigFood = action.payload.timeToRemoveBigFood;
    });
});

export default gameReducer;

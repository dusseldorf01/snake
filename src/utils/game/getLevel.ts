import gameConfig from '@/game/config';

const {
  LEVEL_SCORE_CHANGING,
  MAX_LEVEL,
} = gameConfig;

const getLevel = (currentLevel: number, startLevel: number, score: number): number => {
  if (score === 0 || currentLevel >= MAX_LEVEL) {
    return currentLevel;
  }
  if (score >= (currentLevel - startLevel + 1) * LEVEL_SCORE_CHANGING) {
    return currentLevel + 1;
  }
  return currentLevel;
};

export default getLevel;

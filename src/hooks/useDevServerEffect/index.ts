import { DependencyList, EffectCallback, useEffect } from 'react';

const useDevServerEffect = (effect: EffectCallback, deps: DependencyList) => {
  if (WEBPACK_DEV_SERVER) {
    useEffect(effect, deps);
  }
};

export default useDevServerEffect;

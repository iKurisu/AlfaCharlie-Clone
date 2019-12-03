import { useEffect, EffectCallback, useRef } from "react";

const useDidUpdateEffect = <D>(
  effect: EffectCallback,
  deps?: readonly D[]
): void => {
  const didMount = useRef(false);

  const setDidMount = (): void => {
    didMount.current = true;
  };

  useEffect(didMount.current ? effect : setDidMount, deps);
};

export default useDidUpdateEffect;

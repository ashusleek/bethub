import { useLayoutEffect, useRef, FC } from 'react';

export const HookItem: FC<any> = ({ initValue, useHookBody, applyStateChange }) => {
  const lastState = useRef(initValue);
  if (typeof useHookBody !== 'function') {
    throw new Error(`function expected as hook body parameter. got ${typeof useHookBody}`);
  }
  const val = useHookBody();

  useLayoutEffect(() => {
    if (lastState.current !== val) {
      lastState.current = val;
      applyStateChange(val);
    }
  }, [applyStateChange, val]);

  return null;
};

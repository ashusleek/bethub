import { useEffect, useState } from 'react';
import { addHook } from './components/HooksContainer';
import { batch } from './utils';

export const globalHook = (useHookBody: any) => {
  let mounted = false;
  let initStateCalculated = false;
  let lastKnownState: any = undefined;
  let consumers: any = [];

  const applyStateChange = (newState: any) => {
    lastKnownState = newState;
    batch(() => consumers.forEach((c: any) => c(newState)));
  };

  return function Hook(hook: any) {
    const stateInitializer = () => {
      if (!initStateCalculated) {
        lastKnownState = hook;
      }
      return lastKnownState;
    };

    const [state, setState] = useState(stateInitializer);

    useEffect(() => {
      if (!mounted) {
        mounted = true;
        addHook({ hook, useHookBody, applyStateChange });
      }

      consumers.push(setState);
      if (lastKnownState !== state) {
        setState(lastKnownState);
      }
      return () => {
        consumers.splice(consumers.indexOf(setState), 1);
      };

      // eslint-disable-next-line
    }, []);

    return state;
  };
};

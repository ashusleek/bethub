import React, { useState, useEffect } from 'react';
import { HookItem } from './HookItem';
import Store from '../store';
import { mount } from './mountHook';
import { warning } from '../utils';

export const HooksContainer = () => {
  Store.hooksContainerRendered = true;

  useEffect(() => {
    if (Store.hooksContainerMounted) {
      warning(
        'HooksContainer is mounted second time. ' +
          'You should mount HooksContainer before any other component and never unmount it.' +
          'Alternatively, dont use HooksContainer it at all, we will handle that for you.'
      );
    }
    Store.hooksContainerMounted = true;
    return () => {
      process.env.NODE_ENV !== 'test' &&
        warning('HooksContainer is removed from DOM. its not supported, singleton hooks will stop updating.');
    };
  }, []);

  const [hooks, setHooks] = useState<any>([]);

  useEffect(() => {
    Store.mountIntoContainer = (item: any) => setHooks((hooks: any) => [...hooks, item]);
    setHooks(Store.mountQueue);
  }, []);

  return (
    <div>
      {hooks.map((h: any, i: any) => (
        <HookItem {...h} key={i} />
      ))}
    </div>
  );
};

export const addHook = (hook: any) => {
  if (!Store.hooksContainerRendered && !Store.hooksContainerMountedAutomatically) {
    Store.hooksContainerMountedAutomatically = true;
    mount(HooksContainer);
  }
  Store.mountIntoContainer(hook);
};

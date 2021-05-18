import ReactDOM from 'react-dom';

export const batch = (cb: any) => {
  Promise.resolve().then(() => {
    ReactDOM.unstable_batchedUpdates(cb);
  });
};

export const batch_cb = (cb: any) => {
  setTimeout(() => {
    Promise.resolve().then(() => {
      ReactDOM.unstable_batchedUpdates(cb);
    });
  }, 0);
};

export const warning = (message: string) => {
  if (console && console.warn) {
    console.warn(message);
  }
};

import React from 'react';
import { render } from 'react-dom';
import { warning } from '../utils';

export const mount = (Component: any) => {
  if (window && window.document) {
    render(<Component />, window.document.createElement('div'));
  } else {
    warning(
      'Can not mount HooksContainer on server side. ' +
        'Did you manage to run useEffect on server? ' +
        'Please mount HooksContainer into your components tree manually.'
    );
  }
};

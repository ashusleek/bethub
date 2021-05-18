import Store from './store';
import { batch } from './utils';

export const setValues = (formName: string) => {
  return (values: any) => {
    const form: any = Store.getForm(formName);
    if (values && form) {
      batch(() => {
        Object.keys(values).forEach(key => {
          form.setValue(key, values[key]);
        });
      });
    }
  };
};

export const setErrors = (formName: string) => {
  return (values: any) => {
    batch(() => {
      const form: any = Store.getForm(formName);
      if (values && form) {
        Object.keys(values).forEach(key => {
          let message = Array.isArray(values[key]) ? values[key][0] : values[key];
          if (typeof message === 'object' && message !== null) {
            message = message[key];
          }
          form.setError(key, {
            type: 'manual',
            message
          });
        });
      }
    });
  };
};

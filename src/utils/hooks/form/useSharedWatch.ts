import { useWatch } from 'react-hook-form';

export default (control: any) => {
  return function Watch(name: string, defaultValue: number | string | undefined | object) {
    return useWatch({ control: control, name, defaultValue });
  };
};

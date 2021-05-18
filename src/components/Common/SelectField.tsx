import React, { FC, memo } from 'react';
import Select from 'react-select';
import _ from 'underscore';

interface IInputFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  error?: { message: string };
  options: any;
  onChange?: any;
  value?: any;
  isMulti?: boolean;
}
const SelectField: FC<IInputFieldProps> = ({ name, label, placeholder, error, options, onChange, isMulti, value }) => {
  const handleChange = option => {
    isMulti ? onChange(_.pluck(option, 'value')) : onChange(option.value);
  };
  const getSelected = () => {
    if (isMulti) {
      const selectedValue: any = [];
      for (let i = 0; i < value.length; i++) {
        const option = _.find(options, { value: value[i] });
        selectedValue.push(option);
      }
      return selectedValue;
    } else {
      return _.find(options, { value: value });
    }
  };
  return (
    <>
      <Select
        classNamePrefix={`select-field${error ? '-error' : ''}`}
        menuPlacement='auto'
        placeholder={`Select ${placeholder ? placeholder : label || ''}`}
        value={getSelected()}
        className={error && error.message ? 'invalid' : 'valid'}
        name={name}
        options={options}
        onChange={handleChange}
        isMulti={isMulti}
      />
    </>
  );
};

export default memo(SelectField);

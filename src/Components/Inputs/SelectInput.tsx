import React from 'react';
import './SelectInputStyle.css';

interface SelectOption {
    text: string;
    value: string | number;
}

interface SelectInputProps {
    values: SelectOption[];
    // eslint-disable-next-line no-unused-vars
    onChange: (id: string|number) => void;
    currentValue: string | number;
}

const SelectInput = ({ values, onChange, currentValue }:SelectInputProps) => {
  console.log('values: ', values);
  return (
    <div className="select_input_container">
      {values.map((option: SelectOption) => (
        <button
          type="button"
          onClick={() => onChange(option.value)}
          className={`select_option ${currentValue === option.value ? 'selected' : ''}`}
          data-value={option.value}
          key={option.value}
        >
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default SelectInput;

import React from 'react';
import './SelectInputStyle.css';

interface SelectOption {
    text: string;
    value: string | number;
}

interface SelectInputProps {
    values: SelectOption[];
}

const SelectInput = ({ values }:SelectInputProps) => {
  console.log('values: ', values);
  return (
    <div className="select_input_container">
      {values.map((option: SelectOption) => (
        <div className="select_option" data-value={option.value}>
          <p>{option.text}</p>
        </div>
      ))}
    </div>
  );
};

export default SelectInput;

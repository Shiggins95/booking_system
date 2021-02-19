import React, { ChangeEvent } from 'react';
import './TextInput.css';

interface TextInputProps {
    type: string;
    label: string;
    id: string;
    className: string;
    // eslint-disable-next-line no-unused-vars
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
// eslint-disable-next-line arrow-body-style, object-curly-newline
const TextInput = ({ type, label, id, className, onChange }: TextInputProps) => {
  return (
    <div className={`text_input_container ${className}`}>
      <label htmlFor={id}>{label}</label>
      <input onChange={onChange} type={type} id={id} />
    </div>
  );
};

export default TextInput;

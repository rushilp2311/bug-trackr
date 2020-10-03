import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className='form__group'>
      <div className='label'>
        <label htmlFor={label}>{label}</label>
      </div>
      <input {...rest} name={name} id={name} className='form__control' />
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default Input;

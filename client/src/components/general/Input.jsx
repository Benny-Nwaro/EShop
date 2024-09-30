import React from 'react'
import PropTypes from 'prop-types';

 const Input = (name, type, value, placeholder, onChange) => {
  return (
    <div>
        <div className="form-group">
        <Input type = {type} name ={name} value ={value} placeholder = {placeholder} onChange = {onChange}     
        />
        </div>
    </div>
  )
}
Input.propTypes = {
  name: PropTypes.string.isRequired,
    type : PropTypes.string.isRequired,
    value : PropTypes.string.isRequired,
    placeholder : PropTypes.string.isRequired,
    onChange : PropTypes.string.isRequired
};

export default Input;
import React from 'react';
import PropTypes from 'prop-types';
import {capitalize} from "@/context/utils";

export const Input = ({type, name, label, noLabel, onChange, maxLength, min, max, className, value}) => {
    if (!label)
        label = capitalize(name);
    if (['radio', 'checkbox'].includes(type))
        className += 'form-check-input';
    return (
        <>
            {!noLabel ? <label htmlFor={name}>{label}</label> : null}
            <input type={type}
                   id={name}
                   name={name}
                   onChange={onChange}
                   maxLength={maxLength}
                   className={className}
                   min={min}
                   max={max}
                   value={value || ''}
            />
        </>
    );
};

Input.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func
};
Input.defaultProps = {
    label: null,
    noLabel: false,
    maxLength: null,
    className: ''
}
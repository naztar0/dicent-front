import React from 'react';
import {Input} from "@/components/Misc/Input";

export const FilterItem = ({type, name, label, noLabel, onChange, maxLength, min, max, className, value}) => {
    if (['radio', 'checkbox'].includes(type))
        return (
            <div>
                <Input type={type}
                       id={name}
                       name={name}
                       onChange={onChange}
                       maxLength={maxLength}
                       className={className}
                       min={min}
                       max={max}
                       noLabel={true}
                       value={value}
                />
                {' ' + label}
            </div>
        );
    return (
        <div className="d-sm-flex flex-row justify-content-between">
            <Input type={type}
                   id={name}
                   name={name}
                   onChange={onChange}
                   maxLength={maxLength}
                   className={className}
                   min={min}
                   max={max}
                   label={label}
                   noLabel={noLabel}
                   value={value}
            />
        </div>
    );
};

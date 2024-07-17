import React from 'react';
import PropTypes from 'prop-types';

export const IconSpan = ({icon, text, title = false, mb = 3}) => {
    return (
        <div className={`d-flex flex-row align-items-end mb-${mb}`}>
            {icon}
            <span className={`m-2 mb-0 ${title ? 'title mt-4' : ''}`}>{text}</span>
        </div>
    );
};

IconSpan.propTypes = {
    icon: PropTypes.node,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
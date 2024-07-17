import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

export const NavItem = ({link, title}) => {
    return (
        <li className="nav-item">
            <Link to={link} className="nav-link active" aria-current="page">{title}</Link>
        </li>
    );
}

NavItem.propTypes = {
    link: PropTypes.string,
    title: PropTypes.string
};
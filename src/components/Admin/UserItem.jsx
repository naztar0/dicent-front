import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {capitalize, getDateString} from "@/context/utils";
import {Avatar} from "@/components/Avatar";

export const UserItem = ({user, deleteHandler, isMe}) => {
    return (
        <tr>
            <td>{user.id}</td>
            <td>
                <Avatar avatar={user.image} size={45} username={user.name}/>
            </td>
            <td>
                <span>{user.name}</span>
                <br/>
                <small>Created {getDateString(user.created_at)}</small>
            </td>
            <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
            </td>
            <td>
                <span>{capitalize(user.role)}</span>
            </td>
            <td>
                <div className="actions">
                    <Link to={`/admin/users/${user.id}`}>
                        <button type="button" className="btn btn-info btn-sm">
                            <i className="fas fa-pencil-alt"/> Edit
                        </button>
                    </Link>
                    {!isMe ?
                        <button type="button" className="btn btn-danger btn-sm"
                                onClick={e => deleteHandler(e, user.id)}>
                            <i className="fas fa-trash"/> Delete
                        </button> : null}
                </div>
            </td>
        </tr>
    );
};

UserItem.propTypes = {
    user: PropTypes.object,
    deleteHandler: PropTypes.func
};

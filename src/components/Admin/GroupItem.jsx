import React from 'react';
import PropTypes from 'prop-types';
import {getDateString, s3Url} from "@/context/utils";

export const GroupItem = ({group, deleteHandler}) => {
    return (
        <tr>
            <td>{group.id}</td>
            <td>
                <span>{group.title}</span>
                <br/>
                <small>{getDateString(group.created_at)}</small>
            </td>
            <td>
                <div className="actions justify-content-end">
                    <button type="button" className="btn btn-danger btn-sm" onClick={e => deleteHandler(e, group.id)}>
                        <i className="fas fa-trash"/> Delete
                    </button>
                </div>
            </td>
        </tr>
    );
};

GroupItem.propTypes = {
    project: PropTypes.object,
    deleteHandler: PropTypes.func
};

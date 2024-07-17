import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {capitalize, getDateString, s3Url} from "@/context/utils";

export const ProjectItem = ({project, deleteHandler}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td>
                <span>{project.title}</span>
                <br/>
                <small>{getDateString(project.created_at)}</small>
            </td>
            <td>
                <span>{project.group_id || '—'}</span>
            </td>
            <td>
                <span>{project.speakers}</span>
            </td>
            <td>
                <span>{capitalize(project.status)}</span>
            </td>
            <td>
                {project.audiofile ? <audio src={s3Url + project.audiofile} controls/> : '—'}
            </td>
            <td>
                <div className="actions">
                    <Link to={`/admin/projects/${project.id}`}>
                        <button type="button" className="btn btn-info btn-sm">
                            <i className="fas fa-pencil-alt"/> Edit
                        </button>
                    </Link>
                    <button type="button" className="btn btn-danger btn-sm" onClick={e => deleteHandler(e, project.id)}>
                        <i className="fas fa-trash"/> Delete
                    </button>
                </div>
            </td>
        </tr>
    );
};

ProjectItem.propTypes = {
    project: PropTypes.object,
    deleteHandler: PropTypes.func
};

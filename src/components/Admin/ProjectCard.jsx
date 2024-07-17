import React from 'react';
import PropTypes from 'prop-types';
import {Input} from "@/components/Misc/Input";

export const ProjectCard = ({projectData, groups, formSubmitHandler, updateInput, deleteHandler}) => {
    return (
        <div className="card card-primary">
            <div className="card-header">
                <h3 className="card-title">Project {projectData.id}</h3>
                <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse"
                            title="Collapse">
                        <i className="fas fa-minus"></i>
                    </button>
                </div>
            </div>
            <form className="card-body" onSubmit={formSubmitHandler}>
                <div className="form-group">
                    <Input type="text" name="title" maxLength={32} className="form-control"
                           onChange={updateInput} value={projectData.title}/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputGroup">Group</label>
                    <select name="group_id" value={projectData.group_id || '-'}
                            id="inputGroup"
                            className="form-control custom-select"
                            onChange={updateInput}>
                        <option value="-">-</option>
                        {groups ? groups.map(group => (
                            <option value={group.id} key={group.id}>{group.title}</option>
                        )) : null}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="inputStatus">Status</label>
                    <select name="status" id="inputStatus"
                            className="form-control custom-select"
                            onChange={updateInput} value={projectData.status}>
                        <option value="NONE">None</option>
                        <option value="QUEUED">Queued</option>
                        <option value="IN_PROGRESS">In progress</option>
                        <option value="FAILED">Failed</option>
                        <option value="COMPLETED">Completed</option>
                    </select>
                </div>
                <div className="form-group">
                    <Input type="number" name="speakers" min={1} className="form-control"
                           onChange={updateInput} value={projectData.speakers}/>
                </div>
                <div className="row">
                    <div className="col-12">
                        <input type="button" value="Delete Project" className="btn btn-danger" onClick={deleteHandler}/>
                        <input type="submit" value="Save Changes" className="btn btn-success float-right"/>
                    </div>
                </div>
            </form>
        </div>
    );
};

ProjectCard.propTypes = {
    projectData: PropTypes.object,
    groups: PropTypes.array,
    formSubmitHandler: PropTypes.func,
    updateInput: PropTypes.func,
    deleteHandler: PropTypes.func
};

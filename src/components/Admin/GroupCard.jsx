import React from 'react';
import PropTypes from 'prop-types';
import {GroupItem} from "@/components/Admin/GroupItem";
import {Input} from "@/components/Misc/Input";

export const GroupCard = ({groupData, updateInput, formSubmitHandler}) => {
    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Create group</h3>
                <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse"
                            title="Collapse"><i className="fas fa-minus"></i>
                    </button>
                </div>
            </div>
            <div className="card-body">
                <form className="card-body" onSubmit={formSubmitHandler}>
                    <div className="form-group">
                        <Input type="text" name="title" maxLength={32} className="form-control"
                               onChange={updateInput} value={groupData.title}/>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <input type="submit" value="Create" className="btn btn-success float-right"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

GroupCard.propTypes = {
    groupData: PropTypes.object,
    updateInput: PropTypes.func,
    formSubmitHandler: PropTypes.func
};

import React from 'react';
import PropTypes from 'prop-types';
import {GroupItem} from "@/components/Admin/GroupItem";

export const GroupsCard = ({groups, deleteHandler}) => {
    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">Groups</h3>
                <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse"
                            title="Collapse"><i className="fas fa-minus"></i>
                    </button>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-striped projects">
                    <thead>
                    <tr>
                        <th style={{width: "1%"}}>ID</th>
                        <th style={{width: "10%"}}>Title</th>
                        <th style={{width: "10%"}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        groups ? groups.map(group =>
                            <GroupItem group={group} deleteHandler={deleteHandler} key={group.id}/>) : null
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

GroupsCard.propTypes = {
    groups: PropTypes.array,
    deleteHandler: PropTypes.func
};

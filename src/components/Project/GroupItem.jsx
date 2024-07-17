import React from 'react';
import PropTypes from 'prop-types';
import {FolderIcon} from "@/components/Misc/Icons";
import * as Icons from "@material-ui/icons";
import {Link} from "react-router-dom";

export const GroupItem = ({group, projects, onClick}) => {
    return (
        <div key={group.id + group.title} className="resp-col col-sm-2 mt-3">
            <Link to={`/groups/${group.id}`}>
                <div className="project-item project" onClick={onClick}>
                    <div className="card-body">
                        <FolderIcon/>
                        <div className="card-title">
                            <Icons.Title/>&nbsp;
                            <span>{group.title}</span>
                            <br/>
                            <Icons.DescriptionOutlined/>&nbsp;
                            <span>{projects}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

GroupItem.propTypes = {
    group: PropTypes.object,
    projects: PropTypes.number,
    onClick: PropTypes.func
};

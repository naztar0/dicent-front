import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {FileIcon} from "@/components/Misc/Icons";
import * as Icons from "@material-ui/icons";
import {capitalize} from "@/context/utils";
import {IconSpan} from "@/components/Project/IconSpan";

export const ProjectItem = ({project}) => {
    return (
        <div key={project.id + project.title} className="resp-col col-sm-2 mt-3">
            <Link to={`/projects/${project.id}`}>
                <div className="project-item project">
                    <div className="card-body">
                        <FileIcon/>
                        <div className="card-title">
                            <IconSpan icon={<Icons.Title/>} text={project.title} mb={1}/>
                            <IconSpan icon={<Icons.GroupOutlined/>} text={project.speakers || 1} mb={1}/>
                            <IconSpan icon={<Icons.CheckCircleOutlineRounded/>} text={capitalize(project.status)}
                                      mb={1}/>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

ProjectItem.propTypes = {
    project: PropTypes.object
};

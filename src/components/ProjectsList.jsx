import React from 'react'
import {ProjectItem} from "@/components/Project/ProjectItem";
import {GroupItem} from "@/components/Project/GroupItem";


export const ProjectsList = ({projects, groups, group}) => {
    if (group)
        return (
            <>
                {
                    projects.filter(project => project.group_id === group).map(project =>
                        <ProjectItem project={project} key={project.id}/>
                    )
                }
            </>
        )

    return (
        <>
            {
                groups.map(group =>
                    <GroupItem group={group} key={group.id}
                               projects={projects.filter(project => project.group_id === group.id).length}/>
                )
            }
            {
                projects.filter(project => !project.group_id).map(project =>
                    <ProjectItem project={project} key={project.id}/>
                )
            }
        </>
    );
};
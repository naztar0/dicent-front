import React, {useContext, useEffect, useState} from 'react';
import toast from "react-hot-toast";
import {useNavigate, useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import {ApiContext} from "@/context/api/apiContext";
import {Sidebar} from "@/components/Admin/Sidebar";
import {ProjectCard} from "@/components/Admin/ProjectCard";
import {GroupsCard} from "@/components/Admin/GroupsCard";
import {TranscribesCard} from "@/components/Admin/TranscribesCard";
import {GroupCard} from "@/components/Admin/GroupCard";

export const EditProject = () => {
    const {
        isAuth,
        project,
        groups,
        fetchProject,
        editProject,
        deleteProject,
        fetchGroups,
        createUserGroup,
        deleteGroup,
        editTranscribe,
        deleteTranscribe
    } = useContext(ApiContext);
    const [projectData, setProjectData] = useState({transcribes: []});
    const [groupData, setGroupData] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth)
            return;
        fetchProject(id);
    }, [isAuth]);

    useEffect(() => {
        if (!project)
            return;
        setProjectData({...project});
        fetchGroups(project.user_id);
    }, [project]);

    const updateProjectInput = event => {
        const value = event.target.value !== '-' ? event.target.value : null;
        setProjectData({...projectData, [event.target.name]: value});
    }

    const formSubmitHandler = event => {
        event.preventDefault();
        editProject({project_id: id, ...projectData, callback: toast.success, args: ['Project updated']});
    }

    const updateGroupInput = event => {
        setGroupData({...groupData, [event.target.name]: event.target.value});
    }

    const groupFormSubmitHandler = event => {
        event.preventDefault();
        createUserGroup({user_id: project.user_id, ...groupData, callback: fetchGroups, args: [project.user_id]});
    }

    const updateTranscribeInput = (event, index) => {
        let transcribes = projectData.transcribes;
        transcribes[index] = {...transcribes[index], [event.target.name]: event.target.value}
        setProjectData({...projectData, transcribes});
    }

    const transcribeFormSubmitHandler = (event, index) => {
        editTranscribe({
            ...projectData.transcribes[index], transcribe_id: projectData.transcribes[index].id,
            callback: toast.success, args: ['Transcribe updated']
        });
    }

    const deleteProjectHandler = _ => {
        const callback = () => {
            toast.success('Project deleted');
            navigate('/admin/projects');
        }
        deleteProject({project_id: id, callback, args: []});
    }
    const deleteGroupHandler = (event, group_id) => {
        deleteGroup({group_id, callback: fetchGroups, args: [project.user_id]});
    }
    const deleteTranscribeHandler = (event, transcribe_id) => {
        deleteTranscribe({transcribe_id, callback: fetchProject, args: [id]});
    }

    return (
        <>
            <Helmet title="Admin ∣ Edit project"/>
            <div className="wrapper">
                <Sidebar/>
                <div className="content-wrapper">
                    <section className="content">
                        <div className="row">
                            <div className="col-md-12">
                                <ProjectCard projectData={projectData} groups={groups} updateInput={updateProjectInput}
                                             formSubmitHandler={formSubmitHandler}
                                             deleteHandler={deleteProjectHandler}/>
                            </div>
                            <div className="col-md-6">
                                {groups ? <GroupsCard groups={groups} deleteHandler={deleteGroupHandler}/> : null}
                            </div>
                            <div className="col-md-6">
                                <GroupCard groupData={groupData} updateInput={updateGroupInput}
                                           formSubmitHandler={groupFormSubmitHandler}/>
                            </div>
                        </div>
                        <TranscribesCard transcribes={projectData.transcribes} updateInput={updateTranscribeInput}
                                         formSubmitHandler={transcribeFormSubmitHandler}
                                         deleteHandler={deleteTranscribeHandler}/>
                    </section>
                </div>
            </div>
        </>
    );
};

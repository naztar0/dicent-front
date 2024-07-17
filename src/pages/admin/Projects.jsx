import React, {useContext, useEffect, useState} from 'react';
import {ApiContext} from "@/context/api/apiContext";
import {pagination} from "@/context/utils";
import {Helmet} from "react-helmet";
import {Sidebar} from "@/components/Admin/Sidebar";
import {ProjectItem} from "@/components/Admin/ProjectItem";
import {ProjectFilters} from "@/components/Admin/ProjectsFilters";
import toast from "react-hot-toast";

export const Projects = () => {
    const {isAuth, projects, fetchProjects, deleteProject} = useContext(ApiContext);
    const defaultParams = {page: 1, perPage: 5};
    const [postParams, setPostParams] = useState(defaultParams);
    let formData = {};

    useEffect(() => {
        if (!isAuth)
            return;
        fetchProjects(postParams);
    }, [isAuth, postParams]);

    const formSubmitHandler = event => {
        event.preventDefault();
        setPostParams({...postParams, ...formData});
    }

    const inputChangeHandler = event => {
        formData[event.target.name] = event.target.value;
        if (['', 'all'].includes(formData[event.target.name]))
            formData[event.target.name] = null;
    }
    const searchHandler = event => {
        if (event.key !== 'Enter')
            return;
        let text = event.target.value.trim();
        if (text)
            setPostParams({...postParams, search: text});
    }
    const deleteProjectHandler = (event, project_id) => {
        const callback = () => {
            toast.success('Project deleted');
            fetchProjects(postParams);
        }
        deleteProject({project_id, callback, args: []});
    }

    return (
        <>
            <Helmet title="Admin ∣ Projects"/>
            <div className="wrapper">
                <Sidebar/>
                <div className="content-wrapper">
                    <section className="content pt-2">
                        <ProjectFilters formSubmitHandler={formSubmitHandler} inputChangeHandler={inputChangeHandler}
                                        setPostParams={setPostParams} postParams={postParams}
                                        searchHandler={searchHandler}/>
                        <div className="container-fluid card-body">
                            <table className="table table-striped projects">
                                <thead>
                                <tr>
                                    <th style={{width: "1%"}}>ID</th>
                                    <th style={{width: "10%"}}>Title</th>
                                    <th style={{width: "10%"}}>Group</th>
                                    <th style={{width: "1%"}}>Speakers</th>
                                    <th style={{width: "10%"}}>Status</th>
                                    <th style={{width: "30%"}}>Audio</th>
                                    <th style={{width: "10%"}}></th>
                                </tr>
                                </thead>
                                <tbody>
                                {projects ? projects.data.map(project =>
                                    <ProjectItem project={project} deleteHandler={deleteProjectHandler}
                                                 key={project.id}/>) : null}
                                </tbody>
                            </table>
                            <div className="pagination-box mb-2">
                                {projects ? pagination(projects, postParams, setPostParams) : null}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

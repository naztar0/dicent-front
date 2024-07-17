import React, {useContext, useState} from 'react';
import toast from "react-hot-toast";
import {Helmet} from "react-helmet";
import {ApiContext} from "@/context/api/apiContext";
import {Sidebar} from "@/components/Admin/Sidebar";
import {ProjectCreateCard} from "@/components/Admin/ProjectCreateCard";

export const CreateProject = () => {
    const {createProject} = useContext(ApiContext);
    const [projectData, setProjectData] = useState({});

    const updateInput = event => {
        setProjectData({...projectData, [event.target.name]: event.target.value});
    }
    const formSubmitHandler = event => {
        event.preventDefault();
        createProject({...projectData, callback: toast.success, args: ['Project created #']});
    }

    return (
        <>
            <Helmet title="Admin ∣ Create project"/>
            <div className="wrapper">
                <Sidebar/>
                <div className="content-wrapper">
                    <section className="content">
                        <ProjectCreateCard projectData={projectData} formSubmitHandler={formSubmitHandler}
                                           updateInput={updateInput}/>
                    </section>
                </div>
            </div>
        </>
    );
};

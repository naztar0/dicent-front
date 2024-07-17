import React, {useContext, useEffect} from 'react';
import {Helmet} from "react-helmet";
import {Sidebar} from "@/components/Admin/Sidebar";
import {ApiContext} from "@/context/api/apiContext";


export const Home = () => {
    const {isAuth, projects, users, fetchProjects, fetchUsers} = useContext(ApiContext);

    useEffect(() => {
        if (!isAuth)
            return;
        fetchProjects({page: 1, perPage: 0});
        fetchUsers({page: 1, perPage: 0});
    }, [isAuth]);

    return (
        <>
            <Helmet title="Admin ∣ Home"/>
            <div className="wrapper">
                <Sidebar/>
                <div className="content-wrapper">
                    <section className="content">
                        <div className="container-fluid">

                            <div className="row">
                                <div className="col-12 col-sm-6">
                                    <div className="info-box">
                                    <span className="info-box-icon bg-info elevation-1"><i
                                        className="fas fa-file-signature"></i></span>
                                        <div className="info-box-content">
                                            <span className="info-box-text">Total projects</span>
                                            <span className="info-box-number">{projects ? projects.total : 0}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-sm-6">
                                    <div className="info-box mb-3">
                                    <span className="info-box-icon bg-warning elevation-1"><i
                                        className="fas fa-users"></i></span>
                                        <div className="info-box-content">
                                            <span className="info-box-text">Total users</span>
                                            <span className="info-box-number">{users ? users.total : 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

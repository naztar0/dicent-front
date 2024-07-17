import React, {useContext} from 'react';
import {Avatar} from "@/components/Avatar";
import {ApiContext} from "@/context/api/apiContext";
import {Link} from "react-router-dom";

export const Sidebar = () => {
    const {me} = useContext(ApiContext);

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="/admin" className="brand-link">
                <span className="brand-text font-weight-light">Admin panel</span>
            </a>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <Avatar avatar={me ? me.image : null} size={32} username={me ? me.name : null} padding={8}/>
                    </div>
                    <div className="info">
                        <Link to={`/admin/users/${me ? me.id : 0}`} className="d-block">{me ? me.name : 'admin'}</Link>
                    </div>
                </div>
                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                    >
                        <li className="nav-item">
                            <Link to="/admin" className="nav-link active">
                                <i className="nav-icon fas fa-tachometer-alt"/>
                                <p>Dashboard</p>
                            </Link>
                        </li>
                        <li className="nav-item menu-open">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-file-alt"/>
                                <p>Projects<i className="right fas fa-angle-left"/></p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/admin/projects" className="nav-link">
                                        <i className="far fa-circle nav-icon"/>
                                        <p>All projects</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/projects/create" className="nav-link">
                                        <i className="far fa-circle nav-icon"/>
                                        <p>Create project</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item menu-open">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-users"/>
                                <p>Users<i className="right fas fa-angle-left"/></p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/admin/users" className="nav-link">
                                        <i className="far fa-circle nav-icon"/>
                                        <p>All users</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/admin/users/create" className="nav-link">
                                        <i className="far fa-circle nav-icon"/>
                                        <p>Create user</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

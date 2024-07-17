import React, {useContext, useEffect, useState} from 'react';
import * as Icons from "@material-ui/icons";
import {Helmet} from "react-helmet";
import toast from "react-hot-toast";
import {Link, useLocation, useParams} from "react-router-dom";
import {ApiContext} from "@/context/api/apiContext";
import {ProjectsList} from "@/components/ProjectsList";
import {FilterItem} from "@/components/Project/FilterItem";
import {pagination} from "@/context/utils";
import {Input} from "@/components/Misc/Input";


export const Projects = () => {
    const {fetchUserProjects, projects, fetchGroups, groups, isAuth, createGroup} = useContext(ApiContext);

    const defaultParams = {page: 1, perPage: 10};
    const [postParams, setPostParams] = useState(defaultParams);
    const [newGroupTitle, setNewGroupTitle] = useState('');
    const location = useLocation();
    const {group_id} = useParams();

    if (location.pathname.split('/')[1] === 'groups') {
        if (group_id && postParams.group !== Number.parseInt(group_id))
            setPostParams({...postParams, group: Number.parseInt(group_id)});
    }

    let formData = {};

    const groupSubmitHandler = event => {
        event.preventDefault()
        createGroup({title: newGroupTitle, callback: fetchGroups});
        toast.success('Group ' + newGroupTitle + ' created!');
    }
    const formSubmitHandler = event => {
        event.preventDefault();
        setPostParams({...postParams, ...formData});
    }
    const inputChangeHandler = event => {
        formData[event.target.name] = event.target.value;
        if (['', 'all'].includes(formData[event.target.name]))
            formData[event.target.name] = null;
    }
    const search = event => {
        if (event.key !== 'Enter')
            return;
        let text = event.target.value.trim();
        if (text)
            setPostParams({...postParams, search: text});
    }

    useEffect(() => {
        if (!isAuth)
            return;
        fetchUserProjects(postParams);
    }, [isAuth, postParams]);
    useEffect(() => {
        if (!isAuth)
            return;
        setPostParams(defaultParams);
        fetchUserProjects(postParams);
    }, [location]);
    useEffect(() => {
        if (!isAuth)
            return;
        fetchGroups();
    }, [isAuth]);

    let group_title = group_id && groups && groups.find(g => g.id === Number.parseInt(group_id));
    if (group_title) group_title = groups.find(g => g.id === Number.parseInt(group_id)).title;

    return (
        <>
            <Helmet title="Projects"/>
            <div className="container">
                <div className="d-flex flex-row justify-content-between align-items-center">
                    <h1>{group_title || 'Projects'}</h1>
                    <div className="nav-search">
                        <input type="search" placeholder="Search projects" onKeyDown={e => search(e)}/>
                        <Icons.SearchRounded id="nav-search-icon"/>
                    </div>
                    <div className="d-flex flex-row">
                        <Link to='/projects/create'>
                            <button className="btn btn-primary">New project</button>
                        </Link>
                        <div className="dropdown collapse-wrapper">
                            <button className="btn btn-primary" data-bs-toggle="dropdown"
                                    aria-expanded="false" type="button" id="dropdownMenuProjectsFilter">Add group
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuProjectsFilter">
                                <li>
                                    <form className="filter" onSubmit={groupSubmitHandler}>
                                        <Input type="text" name="title" maxLength={32} value={newGroupTitle}
                                               onChange={e => setNewGroupTitle(e.target.value)}/>
                                        <button type="submit" className="btn btn-outline-primary mt-2">Create</button>
                                    </form>
                                </li>
                            </ul>
                        </div>
                        <div className="dropdown collapse-wrapper">
                            <button className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
                                    aria-expanded="false" type="button" id="dropdownMenuProjectsFilter">Filter
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuProjectsFilter">
                                <li>
                                    <form className="filter" onSubmit={formSubmitHandler}>
                                        <FilterItem label="Speakers from:&nbsp;" name="speakersFrom" type="number"
                                                    min={1}
                                                    onChange={inputChangeHandler}/>
                                        <FilterItem label="Speakers to:&nbsp;" name="speakersTo" type="number" min={1}
                                                    onChange={inputChangeHandler}/>
                                        <div className="d-flex flex-row justify-content-between mt-2">
                                            <span>Status:&nbsp;</span>
                                            <div className="d-flex flex-column">
                                                <FilterItem name="status" type="radio" value="all"
                                                            onChange={inputChangeHandler} label="All"/>
                                                <FilterItem name="status" type="radio" value="COMPLETED"
                                                            onChange={inputChangeHandler} label="Completed"/>
                                                <FilterItem name="status" type="radio" value="IN_PROGRESS"
                                                            onChange={inputChangeHandler} label="In progress"/>
                                                <FilterItem name="status" type="radio" value="QUEUED"
                                                            onChange={inputChangeHandler} label="Queued"/>
                                                <FilterItem name="status" type="radio" value="FAILED"
                                                            onChange={inputChangeHandler} label="Failed"/>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-outline-primary mt-2">Apply</button>
                                    </form>
                                </li>
                            </ul>
                        </div>
                        <div className="dropdown">
                            <button className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
                                    aria-expanded="false" type="button" id="dropdownMenuProjectsSort">Sort
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuProjectsSort">
                                <li>
                                    <button className="dropdown-item" onClick={() => {
                                        setPostParams({
                                            ...postParams,
                                            ordDate: postParams.ordDate === 'desc' ? 'asc' : 'desc'
                                        });
                                    }}>By date {postParams.ordDate === 'asc' ? '↓' : '↑'}</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="content full row">
                    {projects && groups !== undefined ?
                        <ProjectsList projects={projects.data} groups={groups} group={postParams.group}/>
                        : null}
                </div>
                <div className="pagination-box">
                    {projects ? pagination(projects, postParams, setPostParams) : null}
                </div>
            </div>
        </>
    );
}
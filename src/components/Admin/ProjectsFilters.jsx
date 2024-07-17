import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from "@material-ui/icons";
import {FilterItem} from "@/components/Project/FilterItem";

export const ProjectFilters = ({inputChangeHandler, postParams, setPostParams, formSubmitHandler, searchHandler}) => {
    return (
        <div className="d-flex flex-row justify-content-between align-items-center">
            <div/>
            <div className="nav-search">
                <input type="search" placeholder="Search projects" onKeyDown={searchHandler}/>
                <Icons.SearchRounded id="nav-search-icon"/>
            </div>
            <div className="d-flex flex-row">
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
    );
};

ProjectFilters.propTypes = {
    inputChangeHandler: PropTypes.func,
    postParams: PropTypes.object,
    setPostParams: PropTypes.func,
    formSubmitHandler: PropTypes.func,
    searchHandler: PropTypes.func
};

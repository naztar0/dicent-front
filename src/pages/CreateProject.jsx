import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import {ApiContext} from "@/context/api/apiContext";
import toast from "react-hot-toast";
import {Input} from "@/components/Misc/Input";

export const CreateProject = () => {
    const {groups, fetchGroups, createProject, isAuth} = useContext(ApiContext);
    const [title, setTitle] = useState('');
    const [speakers, setSpeakers] = useState(1);
    const [group, setGroup] = useState('-');
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth || groups !== undefined)
            return;
        fetchGroups();
    }, [isAuth]);

    function formSubmitHandler(event) {
        event.preventDefault();
        if (!title || !title.trim() || !speakers) {
            toast.error("Title or speakers are incorrect!");
            return;
        }
        const group_id = group !== '-' ? Number.parseInt(group) : null;
        createProject({title, speakers, group_id, callback: navigate, args: ['/projects/']});
    }

    return (
        <>
            <Helmet title="Create"/>
            <div className="container">
                <h1 className="display-6">Create project</h1>
                <div className="content d-flex flex-column">
                    <form className="create-project">
                        <Input type="text" name="title" maxLength={32} onChange={e => setTitle(e.target.value)}
                               value={title}/>
                        <Input type="number" name="speakers" min={1} onChange={e => setSpeakers(e.target.value)}
                               value={speakers}/>
                        <label htmlFor="group_id">Group</label>
                        <select name="group_id" id="group_id" className="form-select-lg"
                                onChange={e => setGroup(e.target.value)}>
                            <option value="-">-</option>
                            {groups ? groups.map(group => (
                                <option value={group.id} key={group.id}>{group.title}</option>
                            )) : null}
                        </select>
                        <button type="submit" className="btn btn-primary" onClick={formSubmitHandler}>Create project
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
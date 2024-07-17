import React, {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import {ApiContext} from "@/context/api/apiContext";
import * as Icons from "@material-ui/icons";
import {apiRequest, capitalize, downloadFile, getDateString, methods, s3Url} from "@/context/utils";
import toast from "react-hot-toast";
import {IconSpan} from "@/components/Project/IconSpan";
import {Transcribe} from "@/components/Project/Transcribe";

export const Project = () => {
    const {
        groups,
        project,
        fetchProject,
        fetchGroups,
        uploadAudioFile,
        editProject,
        editTranscribe,
        deleteProject,
        isAuth,
        resetHooks
    } = useContext(ApiContext);
    const [status, setStatus] = useState();
    const [projectData, setProjectData] = useState({transcribes: []});
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth)
            return;
        if (groups === undefined)
            fetchGroups();
        fetchProject(id);
    }, [isAuth]);
    useEffect(() => {
        if (!project || !status)
            return;
        if (status === 'FAILED')
            return toast.error('Transcription job failed');
        if (status !== 'COMPLETED')
            return checkStatus();
        fetchProject(id);
    }, [status]);
    useEffect(() => {
        if (!project)
            return;
        setProjectData({...project});
    }, [project]);
    useEffect(() => () => {
        resetHooks([project]);
    }, []);

    const stopReload = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    const uploadFile = e => {
        stopReload(e);
        const file = (e.dataTransfer || e.target).files[0];
        uploadAudioFile(id, file, checkStatus);
    }

    const checkStatus = () => {
        if (['COMPLETED', 'FAILED'].includes(status))
            return;
        apiRequest(methods.GET, `/projects/${id}`).then(r => {
            setProjectData(r.data);
            const st = r.data.status;
            if (['COMPLETED', 'FAILED'].includes(st))
                return setStatus(st);
            setTimeout(checkStatus, 3);
        });
    }

    const updateProjectInput = event => {
        setProjectData({...projectData, [event.target.name]: event.target.value});
    }

    const changeProjectData = event => {
        if (event.key === 'Enter' && event.target.value.trim()) {
            editProject({...projectData, project_id: id, callback: fetchProject, args: [id]});
            toast.success(capitalize(event.target.name) + ' changed');
        }
    }

    const updateTranscribeInput = (event, index) => {
        let transcribes = projectData.transcribes;
        transcribes[index] = {...transcribes[index], [event.target.name]: event.target.value}
        setProjectData({...projectData, transcribes});
    }

    const changeTranscribeData = (event, index) => {
        if (event.key === 'Enter' && event.target.value.trim())
            editTranscribe({
                ...projectData.transcribes[index],
                transcribe_id: projectData.transcribes[index].id,
                callback: fetchProject,
                args: [id]
            });
    }

    const changeProjectGroup = event => {
        const group_id = event.target.value !== '-' ? Number.parseInt(event.target.value) : null;
        editProject({group_id, project_id: id, callback: fetchProject, args: id});
        toast.success('Group changed');
    }

    return (
        <>
            <Helmet title={projectData ? projectData.title : "Project"}/>
            {project ?
                <div className="container">
                    <div className="content row">
                        <div className="d-flex flex-column">
                            <div className="d-flex flex-row justify-content-between">
                                <input type="text" name="title" value={projectData.title || ''} className="props title"
                                       onKeyDown={changeProjectData} onChange={updateProjectInput}/>
                                <div className="d-flex flex-row">
                                    <div className="round-btn" onClick={() => {
                                        toast.success('Link copied to clipboard!');
                                    }}><Icons.ShareRounded/>
                                    </div>
                                    <div className="round-btn" onClick={() => {
                                        downloadFile(project.job, project.title).then();
                                    }}><Icons.CloudDownloadRounded/>
                                    </div>
                                    <div className="round-btn danger" onClick={() => {
                                        deleteProject({project_id: id, callback: navigate, args: ['/projects']})
                                    }}><Icons.DeleteRounded/>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-column">
                                <IconSpan icon={<Icons.AccessTime/>}
                                          text={getDateString(projectData.created_at)}/>
                                <IconSpan icon={<Icons.GroupOutlined/>} text={projectData.speakers || 1}/>
                                <div className="d-flex flex-row align-items-end mb-3">
                                    <Icons.FolderOpenRounded/>
                                    <select name="group_id" value={projectData.group_id || '-'}
                                            className="form-select-sm"
                                            onChange={changeProjectGroup}>
                                        <option value="-">-</option>
                                        {groups ? groups.map(group => (
                                            <option value={group.id} key={group.id}>{group.title}</option>
                                        )) : null}
                                    </select>
                                </div>
                            </div>
                            {projectData.audiofile ?
                                <>
                                    <div className="d-flex flex-row align-items-end mt-2">
                                        <Icons.Audiotrack/>
                                        <audio src={s3Url + projectData.audiofile} controls/>
                                    </div>
                                    {projectData.status !== 'COMPLETED' ?
                                        <h5 className="text-center mt-2">Audiofile in processing, please wait...</h5>
                                        : null}
                                </>
                                :
                                <div>
                                    <div className="drop-area d-flex flex-column" onDrop={uploadFile}
                                         onDragOver={stopReload}>
                                        <span>Drop audiofile</span>
                                        <span className="mt-2 mb-2">or</span>
                                        <input type="file" className="form-control" onChange={uploadFile}
                                               placeholder="Upload file" accept="audio/*"/>
                                    </div>
                                </div>}
                            {projectData.transcribes.length ?
                                <IconSpan icon={<Icons.ListRounded/>} text="Transcribes" title={true}/>
                                : null
                            }
                            <div>
                                {projectData.transcribes.map((trans, index) =>
                                    <Transcribe trans={trans} changeTranscribeData={changeTranscribeData} index={index}
                                                updateTranscribeInput={updateTranscribeInput} key={trans.id}/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                : null}
        </>
    );
}
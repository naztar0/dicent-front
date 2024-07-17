import React, {useReducer} from 'react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import * as types from '@/context/types';
import {ApiContext} from './apiContext';
import {apiReducer} from './apiReducer';
import {apiRequest, methods} from "@/context/utils";


const wrapReducer = () => {
    const initializer = loading => {
        return {loading}
    };
    const [state, dispatch] = useReducer(apiReducer, false, initializer);
    // noinspection all
    const wrapDispatch = payload => dispatch(payload);
    return [state, wrapDispatch];
}

export const ApiState = ({children}) => {
    const [state, dispatch] = wrapReducer();

    const showLoader = () => dispatch({type: types.SHOW_LOADER});
    const hideLoader = () => dispatch({type: types.HIDE_LOADER});

    const fetchProjects = async (params) => {
        showLoader();
        const res = await apiRequest(methods.GET, '/projects', null, {params});
        const payload = res.data;
        dispatch({type: types.FETCH_PROJECTS, payload});
    };

    const fetchUserProjects = async (params, user_id) => {
        showLoader();
        const me = JSON.parse(Cookies.get('me'));
        const res = await apiRequest(methods.GET, `/users/${user_id || me.id}/projects`, null, {params});
        const payload = res.data;
        dispatch({type: types.FETCH_PROJECTS, payload});
    };

    const fetchProject = async (project_id) => {
        showLoader();
        const res = await apiRequest(methods.GET, `/projects/${project_id}`);
        const payload = res.data;
        dispatch({type: types.FETCH_PROJECT, payload});
    };

    const fetchTranscribes = async (project_id) => {
        showLoader();
        const res = await apiRequest(methods.GET, `/projects/${project_id}/transcribes`);
        const payload = {...res.data, project_id};
        dispatch({type: types.FETCH_TRANSCRIBES, payload});
    };

    const fetchGroups = async (user_id = null) => {
        showLoader();
        const res = await apiRequest(methods.GET, `/groups`, null, user_id ? {params: {user_id}} : {});
        const payload = res.data;
        dispatch({type: types.FETCH_GROUPS, payload});
    };

    const fetchUsers = async (params) => {
        showLoader();
        const res = await apiRequest(methods.GET, '/users', null, {params});
        const payload = res.data;
        dispatch({type: types.FETCH_USERS, payload});
    };

    const fetchUser = async (user_id) => {
        showLoader();
        const res = await apiRequest(methods.GET, `/users/${user_id}`);
        const payload = res.data;
        dispatch({type: types.FETCH_USER, payload});
    };

    const fetchMe = async () => {
        try {
            const res = await apiRequest(methods.GET, '/me');
            const payload = res.data;
            Cookies.set('me', JSON.stringify(payload), {sameSite: 'strict'});
            dispatch({type: types.FETCH_ME, payload});
        } catch (e) {
            if (state.isAuth) {
                dispatch({type: types.LOGIN, isAuth: false});
                Cookies.remove('me');
                Cookies.remove('token');
            }
        }
    };

    const login = async ({email, password}) => {
        const res = await apiRequest(methods.POST, '/auth/login', {email, password}, {withCredentials: true});
        if (res.status !== 200)
            return dispatch({type: types.LOGIN, isAuth: false});
        const payload = res.data;
        dispatch({type: types.LOGIN, isAuth: true});
        Cookies.set('me', JSON.stringify(payload), {sameSite: 'strict'});
        Cookies.set('token', payload.access_token, {sameSite: 'strict'});
        dispatch({type: types.FETCH_ME, payload});
    }

    const register = async ({email, name, password}) => {
        const res = await apiRequest(methods.POST, '/auth/register', {email, name, password}, {withCredentials: true});
        if (!res)
            return dispatch({type: types.REGISTER, success: false});
        await dispatch({type: types.REGISTER, success: true});
        await login({email, password});
    }

    const logout = async () => {
        showLoader();
        const res = await apiRequest(methods.POST, '/auth/logout');
        if (!res)
            return;
        Cookies.remove('me');
        Cookies.remove('token');
        dispatch({type: types.LOGIN, isAuth: false});
        toast.success("Successfully logged out");
    }

    const refreshAuth = async () => {
        if (!state.isAuth && Cookies.get('token')) {
            const payload = JSON.parse(Cookies.get('me'))
            dispatch({type: types.FETCH_ME, payload});
        }
        if (!state.isAuth && Cookies.get('token')) {
            dispatch({type: types.LOGIN, isAuth: true});
            await fetchMe();
        }
    }

    const createUser = async ({email, name, role, password, callback, args}) => {
        showLoader();
        const res = await apiRequest(methods.POST, '/users', {email, name, role, password});
        hideLoader();
        if (res.status === 200 && callback)
            callback(...args);
    }

    const createGroup = async ({title, callback, args}) => {
        showLoader();
        await apiRequest(methods.POST, '/groups', {title});
        hideLoader();
        if (callback)
            callback(...args);
    }

    const createUserGroup = async ({user_id, title, callback, args}) => {
        showLoader();
        await apiRequest(methods.POST, `/groups`, {title}, {params: {user_id}});
        hideLoader();
        if (callback)
            callback(...args);
    }

    const createProject = async ({title, group_id = null, speakers = null, user_id = null, callback, args}) => {
        showLoader();
        const res = await apiRequest(methods.POST, '/projects',
            {title, group_id, speakers}, user_id ? {params: {user_id}} : {});
        hideLoader();
        if (callback)
            callback(args[0] + res.data.id);
    }

    const editProject = async ({project_id, title, group_id, speakers, status, callback, args}) => {
        showLoader();
        let data = {};
        if (title) data.title = title;
        if (group_id !== undefined) data.group_id = group_id;
        if (speakers) data.speakers = speakers;
        if (status) data.status = status;
        await apiRequest(methods.PATCH, `/projects/${project_id}`, data);
        hideLoader();
        if (callback)
            callback(...args);
    }

    const editTranscribe = async ({transcribe_id, speaker, content, callback, args}) => {
        showLoader();
        let data = {};
        if (speaker) data.speaker = speaker;
        if (content) data.content = content;
        await apiRequest(methods.PATCH, `/transcribes/${transcribe_id}`, data);
        hideLoader();
        if (callback)
            callback(...args);
    }

    const deleteGroup = async ({group_id, callback, args}) => {
        showLoader();
        await apiRequest(methods.DElETE, `/groups/${group_id}`);
        hideLoader();
        if (callback)
            callback(...args);
    }

    const deleteProject = async ({project_id, callback, args}) => {
        showLoader();
        await apiRequest(methods.DElETE, `/projects/${project_id}`);
        hideLoader();
        if (callback)
            callback(...args);
    }
    const deleteTranscribe = async ({transcribe_id, callback, args}) => {
        showLoader();
        await apiRequest(methods.DElETE, `/transcribes/${transcribe_id}`);
        hideLoader();
        if (callback)
            callback(...args);
    }

    const deleteUser = async ({user_id, callback, args}) => {
        showLoader();
        await apiRequest(methods.DElETE, `/users/${user_id}`);
        hideLoader();
        if (callback)
            callback(...args);
    }

    const uploadAudioFile = async (project_id, file, callback) => {
        showLoader();
        const data = new FormData();
        data.append("audiofile", file);
        await apiRequest(methods.POST, `/projects/${project_id}/audiofile`, data, {headers: {'Content-Type': 'multipart/form-data'}});
        hideLoader();
        callback();
    }

    const editAvatar = async ({user_id, image, callback, args}) => {
        const data = new FormData();
        data.append("image", image);
        await apiRequest(methods.POST, `/users/${user_id}/avatar`, data, {headers: {'Content-Type': 'multipart/form-data'}});
        if (callback)
            callback(...args);
    }

    const editUser = async ({user_id, data, callback, args}) => {
        showLoader();
        await apiRequest(methods.PATCH, `/users/${user_id}`, data);
        hideLoader();
        if (callback)
            callback(...args);
    }

    const resetHooks = (hooks) => {
        hooks.forEach(hook => {
            switch (hook) {
                case state.user:
                    dispatch({type: types.FETCH_USER, payload: null});
                    break;
                case state.users:
                    dispatch({type: types.FETCH_USERS, payload: null});
                    break;
                case state.project:
                    dispatch({type: types.FETCH_PROJECT, payload: null});
                    break;
                case state.projects:
                    dispatch({type: types.FETCH_PROJECTS, payload: null});
                    break;
                case state.transcribes:
                    dispatch({type: types.FETCH_TRANSCRIBES, payload: null});
                    break;
                default:
                    break;
            }
        });
    }

    return (
        <ApiContext.Provider value={{
            showLoader,
            fetchProjects,
            fetchUserProjects,
            fetchProject,
            fetchUsers,
            fetchUser,
            fetchTranscribes,
            fetchGroups,
            uploadAudioFile,
            login,
            logout,
            register,
            refreshAuth,
            fetchMe,
            editAvatar,
            editUser,
            editTranscribe,
            createUser,
            createGroup,
            createUserGroup,
            createProject,
            editProject,
            deleteProject,
            deleteTranscribe,
            deleteGroup,
            deleteUser,
            resetHooks,

            loading: state.loading,
            projects: state.projects,
            project: state.project,
            users: state.users,
            user: state.user,
            groups: state.groups,
            transcribes: state.transcribes,
            isAuth: state.isAuth,
            isReg: state.isReg,
            isErr: state.isErr,
            me: state.me,
        }}>
            {children}
        </ApiContext.Provider>
    )
}
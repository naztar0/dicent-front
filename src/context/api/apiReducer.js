import * as types from '@/context/types';

const handlers = {
    [types.SHOW_LOADER]: state => ({...state, loading: true}),
    [types.HIDE_LOADER]: state => ({...state, loading: false}),
    [types.FETCH_GROUPS]: (state, {payload}) => ({...state, groups: payload, loading: false}),
    [types.FETCH_TRANSCRIBES]: (state, {payload}) => ({...state, transcribes: payload, loading: false}),
    [types.FETCH_PROJECTS]: (state, {payload}) => ({...state, projects: payload, loading: false}),
    [types.FETCH_PROJECT]: (state, {payload}) => ({...state, project: payload, loading: false}),
    [types.FETCH_USERS]: (state, {payload}) => ({...state, users: payload, loading: false}),
    [types.FETCH_USER]: (state, {payload}) => ({...state, user: payload, loading: false}),
    [types.FETCH_ME]: (state, {payload}) => ({...state, me: payload, loading: false}),
    [types.LOGIN]: (state, {isAuth}) => ({...state, isAuth: isAuth, loading: false}),
    DEFAULT: state => state
};

export const apiReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
};
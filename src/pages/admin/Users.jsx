import React, {useContext, useEffect, useState} from 'react';
import toast from "react-hot-toast";
import {Helmet} from "react-helmet";
import {ApiContext} from "@/context/api/apiContext";
import {pagination} from "@/context/utils";
import {UserItem} from "@/components/Admin/UserItem";
import {Sidebar} from "@/components/Admin/Sidebar";
import Cookies from "js-cookie";

export const Users = () => {
    const {isAuth, users, fetchUsers, deleteUser} = useContext(ApiContext);
    const defaultParams = {page: 1, perPage: 10};
    const [postParams, setPostParams] = useState(defaultParams);
    const me = Cookies.get('me') ? JSON.parse(Cookies.get('me')) : null;

    useEffect(() => {
        if (!isAuth)
            return;
        fetchUsers(postParams);
    }, [isAuth, postParams]);

    const deleteUserHandler = (event, user_id) => {
        const callback = () => {
            toast.success('User deleted');
            fetchUsers(postParams);
        }
        deleteUser({user_id, callback, args: []});
    }

    return (
        <>
            <Helmet title="Admin ∣ Users"/>
            <div className="wrapper">
                <Sidebar/>
                <div className="content-wrapper">
                    <section className="content">
                        <div className="container-fluid">
                            <div className="card-body" style={{display: "block"}}>
                                <table className="table table-striped projects">
                                    <thead>
                                    <tr>
                                        <th style={{width: "1%"}}>ID</th>
                                        <th style={{width: "10%"}}>Avatar</th>
                                        <th style={{width: "20%"}}>Name</th>
                                        <th style={{width: "20%"}}>Email</th>
                                        <th style={{width: "10%"}}>Role</th>
                                        <th style={{width: "10%"}}></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        users ? users.data.map(user =>
                                            <UserItem user={user} deleteHandler={deleteUserHandler} key={user.id}
                                                      isMe={me ? me.id === user.id : false}/>) : null
                                    }
                                    </tbody>
                                </table>
                                <div className="pagination-box">
                                    {users ? pagination(users, postParams, setPostParams) : null}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

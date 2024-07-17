import React, {useContext, useEffect, useState} from 'react';
import toast from "react-hot-toast";
import {useNavigate, useParams} from "react-router-dom";
import {Helmet} from "react-helmet";
import {ApiContext} from "@/context/api/apiContext";
import {Sidebar} from "@/components/Admin/Sidebar";
import {UserCard} from "@/components/Admin/UserCard";

export const EditUser = () => {
    const {
        isAuth,
        user,
        fetchUser,
        editUser,
        deleteUser
    } = useContext(ApiContext);
    const [userData, setUserData] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth)
            return;
        fetchUser(id);
    }, [isAuth]);

    useEffect(() => {
        if (!user)
            return;
        setUserData({...user});
    }, [user]);

    const updateUserInput = event => {
        setUserData({...userData, [event.target.name]: event.target.value});
    }
    const userFormSubmitHandler = event => {
        event.preventDefault();
        if (userData.email === user.email)
            delete userData.email;
        editUser({user_id: id, data: userData, callback: toast.success, args: ['User updated']});
    }

    const deleteUserHandler = _ => {
        const callback = () => {
            toast.success('User deleted');
            navigate('/admin/users');
        }
        deleteUser({user_id: id, callback, args: [], navigate});
    }

    return (
        <>
            <Helmet title="Admin ∣ Edit user"/>
            <div className="wrapper">
                <Sidebar/>
                <div className="content-wrapper">
                    <section className="content">
                        <UserCard userData={userData} formSubmitHandler={userFormSubmitHandler}
                                  updateInput={updateUserInput} deleteHandler={deleteUserHandler}/>
                    </section>
                </div>
            </div>
        </>
    );
};

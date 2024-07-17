import React, {useContext, useState} from 'react';
import toast from "react-hot-toast";
import {Helmet} from "react-helmet";
import {ApiContext} from "@/context/api/apiContext";
import {Sidebar} from "@/components/Admin/Sidebar";
import {UserCard} from "@/components/Admin/UserCard";

export const CreateUser = () => {
    const {createUser} = useContext(ApiContext);
    const [userData, setUserData] = useState({});

    const updateUserInput = event => {
        setUserData({...userData, [event.target.name]: event.target.value});
    }
    const userFormSubmitHandler = event => {
        event.preventDefault();
        createUser({...userData, callback: toast.success, args: ['User created']});
    }

    return (
        <>
            <Helmet title="Admin ∣ Create user"/>
            <div className="wrapper">
                <Sidebar/>
                <div className="content-wrapper">
                    <section className="content">
                        <UserCard userData={userData} formSubmitHandler={userFormSubmitHandler}
                                  updateInput={updateUserInput}/>
                    </section>
                </div>
            </div>
        </>
    );
};

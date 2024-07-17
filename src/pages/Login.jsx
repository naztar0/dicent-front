import React, {Fragment, useContext, useState} from 'react';
import toast from 'react-hot-toast';
import {Link, Navigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import {ApiContext} from "@/context/api/apiContext";
import {emailRegexp, passRegexp} from "@/context/utils";
import {Input} from "@/components/Misc/Input";

export const Login = () => {
    const {login, isAuth} = useContext(ApiContext);
    const [userData, setUserData] = useState({});

    function formSubmitHandler(event) {
        event.preventDefault();
        if (!userData.email || !userData.email.match(emailRegexp) ||
            !userData.password || !userData.password.match(passRegexp))
            toast.error("Incorrect email or password");
        else
            login(userData);
    }

    function inputChangeHandler(event) {
        setUserData({...userData, [event.target.name]: event.target.value});
    }

    if (isAuth)
        return <Navigate to="/projects" replace/>;

    return (
        <Fragment>
            <Helmet title="Login"/>
            <div className="login-box">
                <span className="title">Sign in</span>
                <form>
                    <div className="login-form">
                        <Input type="email" name="email" onChange={inputChangeHandler} value={userData.email}/>
                        <div className="d-flex flex-row justify-content-between">
                            <label htmlFor="pass">Password</label>
                            <Link to="password-reset"><label className="pointer">Forgot password?</label></Link>
                        </div>
                        <Input type="password" name="password" noLabel={true} onChange={inputChangeHandler}
                               value={userData.password}/>
                        <button onClick={formSubmitHandler}>Sign in</button>
                    </div>
                </form>
                <span className="under-text">Don't have an account?&nbsp;
                    <Link to="/registration">Sign Up</Link>
                </span>
            </div>
        </Fragment>
    );
};

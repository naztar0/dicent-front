import React, {Fragment, useContext, useState} from 'react';
import toast from 'react-hot-toast';
import {Link, Navigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import {ApiContext} from "@/context/api/apiContext";
import {emailRegexp, passRegexp} from "@/context/utils";
import {Input} from "@/components/Misc/Input";

export const Registration = () => {
    const {register, isAuth} = useContext(ApiContext);
    const [passStyle, setPassStyle] = useState('');
    const [userData, setUserData] = useState({});

    function formSubmitHandler(event) {
        event.preventDefault();
        if (!userData.email || !userData.name || !userData.password)
            toast.error("Please fill in all fields");
        else if (!userData.email.match(emailRegexp))
            toast.error("Incorrect email");
        else if (!userData.password.match(passRegexp))
            toast.error("Incorrect password");
        else if (userData.password !== userData.passConfirm)
            toast.error("Passwords are not matches");
        else
            register(userData);
    }

    function inputChangeHandler(event) {
        setUserData({...userData, [event.target.name]: event.target.value});
    }

    if (userData.password && userData.passConfirm) {
        const color = userData.password === userData.passConfirm ? "green" : "red";
        if (color !== passStyle)
            setPassStyle(color);
    }

    if (isAuth)
        return <Navigate to="/projects" replace/>;

    return (
        <Fragment>
            <Helmet title="Registration"/>
            <div className="login-box">
                <span className="title">Sign Up</span>
                <form>
                    <div className="login-form">
                        <Input type="email" name="email" value={userData.email} onChange={inputChangeHandler}/>
                        <Input type="text" name="name" maxLength={64} label="Full name" value={userData.name}
                               onChange={inputChangeHandler}/>
                        <Input type="password" name="password" className={`pass-${passStyle}`}
                               onChange={inputChangeHandler} value={userData.password}/>
                        <Input type="password" name="passConfirm" className={`pass-${passStyle}`}
                               label="Confirm password" onChange={inputChangeHandler} value={userData.passConfirm}/>
                        <button onClick={formSubmitHandler}>Sign up</button>
                    </div>
                </form>
                <span className="under-text">Already have an account?&nbsp;
                    <Link to="/login">Sign In</Link>
                </span>
            </div>
        </Fragment>
    );
};

import React, {useContext, useEffect, useState} from 'react';
import toast from 'react-hot-toast';
import {Navigate} from "react-router-dom";
import {Helmet} from "react-helmet";
import Cookies from "js-cookie";
import {ApiContext} from "@/context/api/apiContext";
import {emailRegexp, passRegexp} from "@/context/utils";
import {Avatar} from "@/components/Avatar";
import {Input} from "@/components/Misc/Input";


export const Profile = () => {
    const {fetchMe, isAuth, editUser, editAvatar, logout} = useContext(ApiContext);
    const [passStyle, setPassStyle] = useState('');
    const [userData, setUserData] = useState({});
    const me = Cookies.get('me') ? JSON.parse(Cookies.get('me')) : null;

    useEffect(() => {
        if (!isAuth)
            return;
        fetchMe();
    }, []);


    function formSubmitHandler(event) {
        event.preventDefault();
        if (userData.email && !userData.email.match(emailRegexp))
            toast.error("Incorrect email");
        else if (userData.password && !userData.password.match(passRegexp))
            toast.error("Incorrect password");
        else if (userData.password !== userData.passConfirm)
            toast.error("Passwords are not matches");
        else {
            let data = userData;
            for (const [key, value] of Object.entries(data))
                if (!value || !value.trim() || me[key] === data[key])
                    delete data[key];
            delete data.passConfirm;
            editUser({user_id: me.id, data, callback: toast.success, args: ['Profile edited']});
        }
    }

    function inputChangeHandler(event) {
        setUserData({...userData, [event.target.name]: event.target.value});
    }

    if (userData.password && userData.passConfirm) {
        const color = userData.password === userData.passConfirm ? "green" : "red";
        if (color !== passStyle)
            setPassStyle(color);
    }

    if (!isAuth)
        return <Navigate to="/login"/>;

    return (
        <>
            <Helmet title="Edit profile"/>
            <div className="container">
                <h1 className="display-6">Profile settings</h1>
            </div>
            {me ?
                <div className="container main-container">
                    <div className="content">
                        <form className="edit-user d-flex flex-column"
                              style={{margin: "0 auto 0 auto", width: "min-content"}}>
                            <Avatar avatar={me.image} size={150} username={me.name} padding={70}/>
                            <label htmlFor="image" style={{cursor: "pointer", textAlign: "center"}}>Upload an
                                image</label>
                            <input className="form-control" id="image" type="file"
                                   accept="image/png, image/jpg, image/jpeg, image/gif"
                                   onChange={() => editAvatar({
                                       user_id: me.id, image: document.getElementById("image").files[0],
                                       callback: fetchMe, args: []
                                   })}/>
                        </form>
                        <form className="edit-user">
                            <Input className="user-inputs" type="email" name="email"
                                   onChange={inputChangeHandler} value={userData.email}/>
                            <Input className="user-inputs" type="text" name="name"
                                   onChange={inputChangeHandler} value={userData.name}/>
                            <Input type="password" name="password" className={`user-inputs pass-${passStyle}`}
                                   onChange={inputChangeHandler} value={userData.password}/>
                            <Input type="password" name="passConfirm" className={`user-inputs pass-${passStyle}`}
                                   label="Confirm password" onChange={inputChangeHandler} value={userData.passConfirm}/>
                            <button className="btn-primary" type="submit" onClick={formSubmitHandler}>Save changes
                            </button>
                            <button type="button" className="btn btn-danger mt-1 w-100" onClick={logout}>Logout</button>
                        </form>
                    </div>
                </div> : null}
        </>
    );
}
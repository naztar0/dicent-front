import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import demo from '@/assets/images/demo.jpg';


export const Home = () => {
    return (
        <Fragment>
            <Helmet title="Home"/>
            <div className="d-flex flex-column home">
                <div>
                    <h1 className="fw-light">Transcribe speech to text</h1>
                    <h1 className="fw-bold">Easier with Dicent</h1>
                    <p className="mt-4">Incredibly beautiful design, streamlined interface and amazing UX.</p>
                </div>
                <div className="home-content">
                    <div>
                        <h1 className="fw-bold">Dicent</h1>
                        <p className="mt-4 fw-light">Transcribe any events, calls or conversations. Wherever there is
                            human speech. We will automatically divide the conversation into speakers to save you from
                            tedious work. All you need is to log in and create your first project!</p>
                        <div className="buttons">
                            <Link to="/registration">
                                <button className="btn btn-primary">Sign Up</button>
                            </Link>
                            <Link to="/login">
                                <button className="btn btn-outline-primary">Sign In</button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <img src={demo} alt="demo"/>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

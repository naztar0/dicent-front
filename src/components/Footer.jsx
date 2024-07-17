import React from "react";
import {Link} from 'react-router-dom'
// import {ReactComponent as LogoSmall} from "../assets/images/logo_small.svg"


export const Footer = () => {
    return (
        <div id="footer">
            <div className="d-flex flex-column">
                <div className="d-flex flex-row">
                    {/*<LogoSmall style={{height: "36px", marginRight: "15px", marginBottom: "10px"}}/>*/}
                    <div className="d-flex flex-column align-items-start">
                        <span>DICENT</span>
                        <span>Copyright © 2022. All rights reserved.</span>
                    </div>
                </div>
                <span>Code licensed under an MIT-style License.</span>
                <span>Version 1.0.0.</span>
            </div>
            <div className="d-flex flex-row justify-content-between right-box">
                <div className="d-flex flex-column">
                    <span className="links">Links</span>
                    <Link to="/">Home</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/profile">Profile</Link>
                </div>
                <div className="d-flex flex-column">
                    <span className="links">References</span>
                    <a href="https://github.com/naztar0/dicent-front.git" target="_blank" rel="noreferrer">GitLab</a>
                    <a href="https://t.me/NrTrN" target="_blank" rel="noreferrer">Telegram</a>
                    <a href="https://gitlab.nixdev.co/taran.n/speech-to-text-front" target="_blank" rel="noreferrer">Source code</a>
                </div>
            </div>
        </div>
    );
}
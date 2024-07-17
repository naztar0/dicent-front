import {useContext, useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import {Menu} from '@material-ui/icons';
import {ApiContext} from "@/context/api/apiContext";
import {Avatar} from "@/components/Avatar";
import {NavItem} from "@/components/Navbar/NavItem";


export const Navbar = () => {
    const {isAuth, me, refreshAuth} = useContext(ApiContext);
    const [openMenu, setOpenMenu] = useState(false);

    useEffect(() => {
        refreshAuth();
    }, [isAuth]);

    return (
        <div className="fixed-top w-100">
            <nav className="navbar navbar-expand-sm d-flex justify-content-between">
                <button id="nav-menu" data-bs-toggle="collapse" data-widget="pushmenu"
                        data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent"
                        aria-expanded="false" aria-label="Toggle navigation"
                        onClick={() => setOpenMenu(!openMenu)}>
                    <Menu/>
                </button>
                <div className="navbar-brand">
                    <Link to="/">[LOGO]</Link>
                </div>
                <div className="hidden-phone">
                    <ul className="navbar-nav">
                        <NavItem link="/" title="Home"/>
                        <NavItem link="/projects" title="Projects"/>
                        <NavItem link="/about" title="About"/>
                    </ul>
                </div>
                <div>
                    {isAuth ? (
                        <NavLink to={`/profile`} style={{textDecoration: "none"}}>
                            <div className="nav-profile-box">
                                <Avatar avatar={me ? me.image : null} size={35} username={me ? me.name : null}
                                        padding={8}/>
                                <span className="nav-profile-text">{me ? me.name : null}</span>
                            </div>
                        </NavLink>
                    ) : (
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/login" style={{textDecoration: "none"}}>
                                    <span className="nav-link">Sign In</span>
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
            <div className={`collapse ${openMenu ? 'show' : ''}`}>
                <div className="bg-light p-4">
                    <ul className="navbar-nav">
                        <NavItem link="/" title="Home"/>
                        <NavItem link="/projects" title="Projects"/>
                        <NavItem link="/about" title="About"/>
                    </ul>
                </div>
            </div>
        </div>
    );
}
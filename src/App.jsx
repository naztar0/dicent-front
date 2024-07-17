import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {Toaster} from "@/components/Toaster";
import {Navbar} from '@/components/Navbar/Navbar';
import {Footer} from "@/components/Footer";
import {Loader} from "@/components/Loader";
import {Home} from "@/pages/Home";
import {Profile} from '@/pages/Profile';
import {Project} from "@/pages/Project";
import {Projects} from "@/pages/Projects";
import {CreateProject} from "@/pages/CreateProject";
import {ApiState} from "@/context/api/ApiState";
import {Login} from "@/pages/Login";
import {Registration} from "@/pages/Registration";
import {Home as AdminHome} from "@/pages/admin/Home";
import {Users as AdminUsers} from "@/pages/admin/Users";
import {Projects as AdminProjects} from "@/pages/admin/Projects";
import {EditProject as AdminEditProject} from "@/pages/admin/EditProject";
import {CreateProject as AdminCreateProject} from "@/pages/admin/CreateProject";
import {EditUser as AdminEditUser} from "@/pages/admin/EditUser";
import {CreateUser as AdminCreateUser} from "@/pages/admin/CreateUser";

function App() {
    return (
        <ApiState>
            <BrowserRouter>
                <Helmet defaultTitle="Dicent" titleTemplate="%s ∣ Dicent"/>
                <Loader/>
                <div>
                    <Navbar/>
                    <Routes>
                        <Route path='/' exact element={<Home/>}/>
                        <Route path={'/login'} first element={<Login/>}/>
                        <Route path={'/registration'} first element={<Registration/>}/>
                        <Route path={'/projects'} exact element={<Projects/>}/>
                        <Route path={'/projects/create'} exact element={<CreateProject/>}/>
                        <Route path={'/projects/:id'} exact element={<Project/>}/>
                        <Route path={'/groups/:group_id'} exact element={<Projects/>}/>
                        <Route path={'/profile'} exact element={<Profile/>}/>
                        <Route path={'/admin'} exact element={<AdminHome/>}/>
                        <Route path={'/admin/users'} exact element={<AdminUsers/>}/>
                        <Route path={'/admin/users/create'} exact element={<AdminCreateUser/>}/>
                        <Route path={'/admin/users/:id'} exact element={<AdminEditUser/>}/>
                        <Route path={'/admin/projects'} exact element={<AdminProjects/>}/>
                        <Route path={'/admin/projects/create'} exact element={<AdminCreateProject/>}/>
                        <Route path={'/admin/projects/:id'} exact element={<AdminEditProject/>}/>
                    </Routes>
                    <Toaster/>
                </div>
                <Footer/>
            </BrowserRouter>
        </ApiState>
    );
}

export default App;

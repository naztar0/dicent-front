import React from 'react';
import PropTypes from 'prop-types';
import {Input} from "@/components/Misc/Input";

export const UserCard = ({userData, formSubmitHandler, updateInput, deleteHandler}) => {
    return (
        <div className="card card-primary">
            <div className="card-header">
                <h3 className="card-title">User {userData.id}</h3>
                <div className="card-tools">
                    <button type="button" className="btn btn-tool" data-card-widget="collapse"
                            title="Collapse">
                        <i className="fas fa-minus"></i>
                    </button>
                </div>
            </div>
            <form className="card-body" onSubmit={formSubmitHandler}>
                <div className="form-group">
                    <Input type="text" name="name" maxLength={32} className="form-control"
                           onChange={updateInput} value={userData.name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputRole">Role</label>
                    <select name="role" id="inputRole"
                            className="form-control custom-select"
                            onChange={updateInput} value={userData.role}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="form-group">
                    <Input type="email" name="email" maxLength={64} className="form-control"
                           onChange={updateInput} value={userData.email}/>
                </div>
                <div className="form-group">
                    <Input type="password" name="password" maxLength={64} className="form-control"
                           onChange={updateInput} value={userData.password}/>
                </div>
                <div className="row">
                    <div className="col-12">
                        {deleteHandler ? <input type="button" value="Delete User" className="btn btn-danger"
                                                onClick={deleteHandler}/> : null}
                        <input type="submit" value="Submit" className="btn btn-success float-right"/>
                    </div>
                </div>
            </form>
        </div>
    );
};

UserCard.propTypes = {
    userData: PropTypes.object,
    formSubmitHandler: PropTypes.func,
    updateInput: PropTypes.func,
    deleteHandler: PropTypes.func
};

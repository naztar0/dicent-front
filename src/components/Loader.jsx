import React, {useContext} from 'react';
import {ApiContext} from "@/context/api/apiContext";
import loader from "@/assets/images/loader.gif";

export const Loader = () => {
    const {loading} = useContext(ApiContext);

    return (
        <div className={`loader ${loading ? 'd-block' : 'd-none'}`}>
            <div>
                <img src={loader} alt="loader"/>
            </div>
        </div>
    )
}
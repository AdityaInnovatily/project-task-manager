import React, { useState } from 'react';
import "./logout.css";

export const Logout = (()=>{
    
    return(
        <>

    <div className="logoutPage">

        <div className="logoutContent">
            <div className="logoutContentHeader">
                Are you sure you want to Logout?
            </div>
            <div className="logoutContentButtons">
                <button className="logoutContentButtonDelete">Yes, Logout</button>
                <button className="logoutContentButtonCancel">Cancel</button>
            </div>
        </div>
    </div>

        </>
        )
    
});
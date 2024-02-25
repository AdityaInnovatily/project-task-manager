import React, { useState } from 'react';
import "./logout.css";

export const Logout = (()=>{

    const [divStyle, setDivStyle] = useState({});

    const handleCancel = () => {
      setDivStyle({ display: 'none' });
    };
    
    return(
        <>

    <div className="logoutPage" style={divStyle}>

        <div className="logoutContent">
            <div className="logoutContentHeader">
                Are you sure you want to Logout?
            </div>
            <div className="logoutContentButtons">
                <button className="logoutContentButtonDelete">Yes, Logout</button>
                <button className="logoutContentButtonCancel" onClick = {handleCancel}>Cancel</button>
            </div>
        </div>
    </div>

        </>
        )
    
});
import React, { useState, useEffect } from 'react';
import "./logout.css";
import { useNavigate } from "react-router-dom";

export const Logout = (()=>{

    const navigate = useNavigate();
    
    const localStorageUserDetails =  JSON.parse(localStorage.getItem(process.env.REACT_APP_TASK_MANAGER_LOCALHOST_KEY));
    
    useEffect(() => {

        if (!localStorage.getItem(process.env.REACT_APP_TASK_MANAGER_LOCALHOST_KEY)) {
          navigate("/login");
        }
      }, []);

    const [divStyle, setDivStyle] = useState({});

    const handleCancel = () => {
      setDivStyle({ display: 'none' });
    };

    const handleClickLogout = async () => {
     
       
        let localStorageKey = process.env.REACT_APP_TASK_MANAGER_LOCALHOST_KEY;
        localStorage.removeItem(localStorageKey);
        navigate("/login");
       
      };
    
    return(
        <>

    <div className="logoutPage" style={divStyle}>

        <div className="logoutContent">
            <div className="logoutContentHeader">
                Are you sure you want to Logout?
            </div>
            <div className="logoutContentButtons">
                <button className="logoutContentButtonDelete" onClick = {handleClickLogout}>Yes, Logout</button>
                <button className="logoutContentButtonCancel" onClick = {handleCancel}>Cancel</button>
            </div>
        </div>
    </div>

        </>
        )
    
});
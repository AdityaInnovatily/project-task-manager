import React, { useState, useEffect  } from 'react';
import "./delete.css";
import { useNavigate } from "react-router-dom";

export const Delete = (()=>{

    const navigate = useNavigate();
    const localStorageUserDetails =  JSON.parse(localStorage.getItem(process.env.REACT_APP_TASK_MANAGER_LOCALHOST_KEY));
    useEffect(() => {

        if (!localStorage.getItem(process.env.REACT_APP_TASK_MANAGER_LOCALHOST_KEY)) {
          navigate("/login");
        }
      }, []);
    
    return(
        <>

    <div className="deletePage">

        <div className="deleteContent">
            <div className="deleteContentHeader">
                Are you sure you want to Delete?
            </div>
            <div className="deleteContentButtons">
                <button className="deleteContentButtonDelete">Yes, Delete</button>
                <button className="deleteContentButtonCancel">Cancel</button>
            </div>
        </div>
    </div>

        </>
        )
    
});
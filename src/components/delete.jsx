import React, { useState } from 'react';
import "./delete.css";

export const Delete = (()=>{
    
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
import "./createTask.css";
import React, {useState, useEffect} from "react";


export const CreateTask = (()=>{


    return(<>
     <div className="createTaskPage">

        <div className="createTaskPageContent">
        
        <div className="createTaskPageContentHeader">Title<span>*</span></div>

        <div className="createTaskPageContentTitleInput">
            <input id = "createTaskPageContentTitleInput" placeholder="Enter Task Title"/>
        </div>

        <div className="createTaskPageContentSelectPriority">

        <div className="createTaskPageContentSelectPriorityText">Select Priority<span>*</span></div>

        <div className="createTaskPageContentSelectPriorityRadioButons">
            
        </div>

        </div>

        <div className="createTaskPageContentCheckList">
        <div className="createTaskPageContentCheckListText">Checklist (0/0)<span>*</span></div>


        </div>


        
        <div className="createTaskPageContentDateAndButtons">

            <div className="createTaskPageContentDate">
                <button id= "createTaskPageContentDate">Select Due Date</button>
            </div>

            <div className="createTaskPageContentButtons">
                <button id= "createTaskPageContentButtonCancel">Cancel</button>
                <button id= "createTaskPageContentButtonSave">Save</button>
            </div>

        </div>
        

        </div>
    </div>

    </>
    )
})
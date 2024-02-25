import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { Card } from "../components/card";
import SideBar from "../components/sideBar";
import "./board.css";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from "react-router-dom";
import { CreateTask } from '../components/createTask';
import {getTaskListApi} from "../APIRoutes";


export const Board = (()=>{
    
    const navigate = useNavigate();

    const localStorageUserDetails =  JSON.parse(localStorage.getItem(process.env.REACT_APP_TASK_MANAGER_LOCALHOST_KEY));
    
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
    
    const [showSorting, setShowSorting] =  useState(false);
    const [isCreateTaskOpen, setCreateTaskOpen] =  useState(false);
    const [sortedBy, setShortedBy] =  useState("This Week");
    const [taskList, setTaskList] =  useState([]);
    const [backlogTaskList, setBacklogTaskList] =  useState([]);
    const [todoTaskList, setTodoTaskList] =  useState([]);
    const [inProgressTaskList, setInProgressTaskList] =  useState([]);
    const [doneTaskList, setDoneTaskList] =  useState([]);


    const handleShowSorting = (()=>{
        setShowSorting(!showSorting);
    });

    const handleOpenCreateTask = (()=>{
        setCreateTaskOpen(!isCreateTaskOpen);
    });


    useEffect(() => {
        // Fetch task data from the API
        const fetchTaskList = async () => {
          try {
            console.log("sadkf;dsljfs",`${getTaskListApi}/${localStorageUserDetails?.userDetails?._id}`);
            const response = await fetch(`${getTaskListApi}/${localStorageUserDetails?.userDetails?._id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                // Include any additional headers required for your GET request
              },
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch task data');
            }
    
            const taskListData = await response.json();

            for(let task of taskListData){
                
                if(task?.status == "backlog"){
                setBacklogTaskList([...backlogTaskList,task]);
                }
                else if(task?.status == "todo"){
                    setTodoTaskList([...todoTaskList,task]);
                }
                else if(task?.status == "inProgress"){
                    setInProgressTaskList([...inProgressTaskList,task]);
                } 
                else if(task?.status == "done"){
                    setDoneTaskList([...doneTaskList,task]);
                }
                
            };

            setTaskList([...taskListData]);
    
          } catch (error) {
            console.error('Error fetching quiz data:', error.message);
          }
        };
    
        fetchTaskList();
        
        },[]);
   

    return <>
        <div className="boardPage">
            <SideBar/>
            <div className="boardPageContent">
                <div className="boardPageContentHeader1">
                    <div className="boardPageContentHeader1UserName">Welcome! {localStorageUserDetails?.userDetails?.name}</div>
                    <div className="boardPageContentHeader1Date">{formattedDate}</div>
                </div>
                <div className="boardPageContentHeader2">
                <div className="boardPageContentHeader2Title">Board</div>
                   
                    <div className="boardPageContentHeader2DropDown" 
                    onClick = {handleShowSorting}>
                    {sortedBy}
                    { showSorting ? <KeyboardArrowUpIcon style = {{ color: "#7b7979" }}/> 
                    :
                    <KeyboardArrowDownIcon  style = {{ color: "#7b7979" }}/> }

                    </div>
                  
                </div>
                
                <div className="boardPageContentMain">

        {/* Backlog */}

                    <div className="boardPageContentMainBacklog">
                        <div className="boardPageContentMainBacklogHeader">
                            <p id = "boardPageContentMainBacklogHeaderTitle">Backlog</p>
                            <ContentCopyIcon/>
                        </div>

                        <div className="boardPageContentMainBacklogCardList">

                        {backlogTaskList.map((item, index) => (
                             
                             <div key={index} className="boardPageContentMainBacklogCard">
              
                                  <Card   
                                          id = {item?._id}
                                          title = {item?.title} 
                                          priority={item?.priority}
                                          dueDate={item?.dueDate}
                                          checklist={item?.checklist}
                                          status = {item?.status}
                                  /> 
                              </div>
                          ))}
                        </div>
                    </div>

        {/* ToDo */}

                    <div className="boardPageContentMainTodo">
                        <div className="boardPageContentMainTodoHeader">
                            <p id = "boardPageContentMainTodoHeaderTitle">To do</p>
                            <div className="boardPageContentMainTodoHeaderRight">
                            {/* <p id = "boardPageContentMainTodoHeaderAddButton"></p> */}
                            <AddIcon onClick = {handleOpenCreateTask}/>
                            <ContentCopyIcon/>
                            </div>
                        </div>
                        {isCreateTaskOpen && (<CreateTask/>)}

                        <div className="boardPageContentMainTodoCardList">


                        {todoTaskList.map((item, index) => (
                             
                             <div key={index} className="boardPageContentMainTodoCard">
              
                                  <Card   
                                          id = {item?._id}
                                          title = {item?.title} 
                                          priority={item?.priority}
                                          dueDate={item?.dueDate}
                                          checklist={item?.checklist}
                                          status = {item?.status}
                                  /> 
                              </div>
                          ))}
                        </div>
                    </div>

        {/* In Progress */}

        <div className="boardPageContentMainInProgress">
                        <div className="boardPageContentMainInProgressHeader">
                            <p id = "boardPageContentMainInProgressHeaderTitle">In progress</p>
                            <ContentCopyIcon/>
                        </div>

                        <div className="boardPageContentMainInProgressCardList">
                        {inProgressTaskList.map((item, index) => (
                             
                             <div key={index} className="boardPageContentMainInProgressCard">
              
                                  <Card   
                                          id = {item?._id}
                                          title = {item?.title} 
                                          priority={item?.priority}
                                          dueDate={item?.dueDate}
                                          checklist={item?.checklist}
                                          status = {item?.status}
                                  /> 
                              </div>
                          ))}

                           

                        </div>
                    </div>

        {/* Done */}
        
        <div className="boardPageContentMainDone">
                        <div className="boardPageContentMainDoneHeader">
                            <p id = "boardPageContentMainDoneHeaderTitle">Done</p>
                            <ContentCopyIcon/>
                        </div>

                        <div className="boardPageContentMainDoneCardList">
                        {doneTaskList.map((item, index) => (
                             
                             <div key={index} className="boardPageContentMainDoneCard">
              
                                  <Card   
                                          id = {item?._id}
                                          title = {item?.title} 
                                          priority={item?.priority}
                                          dueDate={item?.dueDate}
                                          checklist={item?.checklist}
                                          status = {item?.status}
                                  /> 
                              </div>
                          ))}
                        </div>
                    </div>

                    

                </div>
            </div>
        </div>
    </>
})
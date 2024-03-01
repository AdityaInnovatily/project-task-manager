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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const Board = (()=>{
    
    const navigate = useNavigate();

    const localStorageUserDetails =  JSON.parse(localStorage.getItem(process.env.REACT_APP_TASK_MANAGER_LOCALHOST_KEY));
    
    const toastOptions = {
      position: "top-right",
      autoClose: 1000,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    };

    useEffect(() => {

      if (!localStorage.getItem(process.env.REACT_APP_TASK_MANAGER_LOCALHOST_KEY)) {
        navigate("/login");
      }
    }, []);

    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    
    const parts = formatter.formatToParts(date);
    
    let formattedDate = '';
    parts.forEach((part, index) => {
      if (part.type === 'day' && parseInt(part.value) >= 10 && parseInt(part.value) <= 20) {
        formattedDate += part.value + 'th ';
      } else if (part.type === 'day' && parseInt(part.value) % 10 === 1) {
        formattedDate += part.value + 'st ';
      } else if (part.type === 'day' && parseInt(part.value) % 10 === 2) {
        formattedDate += part.value + 'nd ';
      } else if (part.type === 'day' && parseInt(part.value) % 10 === 3) {
        formattedDate += part.value + 'rd ';
      } else {
        formattedDate += part.value + ' ';
      }

      if(part.type == 'month'){
        formattedDate = formattedDate.slice(0,formattedDate.length -1);
        formattedDate += ", ";
      }
     
    });
    
    
    const [showSorting, setShowSorting] =  useState(false);
    const [isCreateTaskOpen, setCreateTaskOpen] =  useState(false);
    const [sortedBy, setSortedBy] =  useState("thisWeek");
    const [taskList, setTaskList] =  useState([]);
    const [updatedStatus, setUpdatedStatus] =  useState("");
    const [taskIdForCreateTask, setTaskIdForCreateTask]= useState("");
    const [statusToCloseChecklist, setStatusToCloseChecklist]= useState("");
    // const [showSortingMenu, setShowSortingMenu]= useState(false);



    const handleShowSorting = (()=>{
        setShowSorting(!showSorting);
    });

    const handleOpenCreateTask = (()=>{
      // toast.error("toastMessage",toastOptions);
        setCreateTaskOpen(!isCreateTaskOpen);
    });

  
    const getNewStatus =  (value)=>{
    
         setUpdatedStatus(value);
      
    }

//     const toastStart =  (toastType, toastMessage)=>{
    
//       console.log('ksafsafj;sf',toastType, toastMessage);

//       toast.error(toastMessage,toastOptions);
//       // setUpdatedStatus(value);
   
//  }


  

    useEffect(() => {
      // Fetch task data from the API
      const fetchTaskList = async () => {
        try {
        
          const response = await fetch(`${getTaskListApi}/${localStorageUserDetails?.userDetails?._id}/${sortedBy}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorageUserDetails?.token}`,
              'Content-Type': 'application/json',
              // Include any additional headers required for your GET request
            },
          });


          // const data = await response.json();
          const taskListData = await response.json();

          
          if (taskListData?.msg) {
            throw new Error(taskListData?.msg);
          }

          setTaskList([...taskListData]);

        } catch (error) {
          toast.error(error.message, toastOptions)
          // console.error('Error fetching quiz data:', data.error);
        }
      };
  
      fetchTaskList();
      setUpdatedStatus("");

   
      },[updatedStatus,sortedBy]);
   
   
    const handleOpenCreateTask2 = (taskId)=>{
      setTaskIdForCreateTask(taskId);

      
      setCreateTaskOpen(!isCreateTaskOpen);
    
    }


    const closeChecklist = (status)=>{

      setStatusToCloseChecklist(status + Math.random());  //Math.random() for unique status
    }


    

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
                    {sortedBy == "thisDay" ? "Today" : (sortedBy == "thisWeek" ? "This Week" : "This Month")}
                    { showSorting ? <KeyboardArrowUpIcon style = {{ color: "#7b7979" }}/> 
                    :
                    <KeyboardArrowDownIcon  style = {{ color: "#7b7979" }}/> }

                    </div>

                    {showSorting && (
            <div className="boardPageContentDropdownMenu">
                <div onClick = {()=>setSortedBy("thisDay")} className = {`boardPageContentDropdownMenuDay ${sortedBy == "thisDay" ? "active" : ""} `}>Today</div>
                <div onClick = {()=>setSortedBy("thisWeek")} className = {`boardPageContentDropdownMenuWeek ${sortedBy == "thisWeek" ? "active" : ""} `}>This Week</div>
                <div onClick = {()=>setSortedBy("thisMonth")} className = {`boardPageContentDropdownMenuMonth ${sortedBy == "thisMonth" ? "active" : ""} `}>This Month</div>
            </div>
                 )}
                  
                </div>
                
                <div className="boardPageContentMain">
                <div className="boardPageContentMainSlider">

        {/* Backlog */}

                    <div className="boardPageContentMainBacklog">
                        <div className="boardPageContentMainBacklogHeader">
                            <p id = "boardPageContentMainBacklogHeaderTitle">Backlog</p>
                            <ContentCopyIcon onClick = {() => closeChecklist("backlog")} />
                        </div>

                        <div className="boardPageContentMainBacklogCardList">

                        {taskList.map((item, index) => (

                            item.status === "backlog" ? 

                             (<div key={index} className="boardPageContentMainBacklogCard">
              
                                  <Card   
                                          id = {item?._id}
                                          title = {item?.title} 
                                          priority={item?.priority}
                                          dueDate={item?.dueDate}
                                          checklist={item?.checklist}
                                          status = {item?.status}
                                          getNewStatus= { getNewStatus }
                                          getOpenCreateTask={handleOpenCreateTask2}
                                          statusToCloseChecklist = {statusToCloseChecklist}
                                  /> 
                                  
                                  {/* {console.log("boardgetNewStaus", getNewStatus)} */}
                              </div>
                          
                             ) : ""
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
                            <ContentCopyIcon onClick = {() => closeChecklist("todo")}/>
                            </div>
                        </div>
                        {isCreateTaskOpen && (<CreateTask taskId = {taskIdForCreateTask} getNewStatus={getNewStatus} />)}

                        <div className="boardPageContentMainTodoCardList">

                       
                        {taskList.map((item, index) => (
                             
                            item.status === "todo" ? (
                             <div key={index} className="boardPageContentMainTodoCard">
              
                                  <Card   
                                          id = {item?._id}
                                          title = {item?.title} 
                                          priority={item?.priority}
                                          dueDate={item?.dueDate}
                                          checklist={item?.checklist}
                                          status = {item?.status}
                                          getNewStatus={getNewStatus}
                                          getOpenCreateTask={handleOpenCreateTask2}
                                          statusToCloseChecklist = {statusToCloseChecklist}

                                  /> 
                              </div>
                            ): ""
                          ))}
                        </div>
                    </div>

        {/* In Progress */}

        <div className="boardPageContentMainInProgress">
                        <div className="boardPageContentMainInProgressHeader">
                            <p id = "boardPageContentMainInProgressHeaderTitle">In progress</p>
                            <ContentCopyIcon onClick = {() => closeChecklist("inProgress")}/>
                        </div>

                        <div className="boardPageContentMainInProgressCardList">

                        {taskList.map((item, index) => (
                             
                            item.status === "inProgress" ? (
                             <div key={index} className="boardPageContentMainInProgressCard">
              
                                  <Card   
                                          id = {item?._id}
                                          title = {item?.title} 
                                          priority={item?.priority}
                                          dueDate={item?.dueDate}
                                          checklist={item?.checklist}
                                          status = {item?.status}
                                          getNewStatus={getNewStatus}
                                          getOpenCreateTask={handleOpenCreateTask2}
                                          statusToCloseChecklist = {statusToCloseChecklist}

                                  /> 
                              </div>
                            ): ""
                          ))}

                           

                        </div>
                    </div>

        {/* Done */}
        
        <div className="boardPageContentMainDone">
                        <div className="boardPageContentMainDoneHeader">
                            <p id = "boardPageContentMainDoneHeaderTitle">Done</p>
                            <ContentCopyIcon onClick = {() => closeChecklist("done")}/>
                        </div>

                        <div className="boardPageContentMainDoneCardList">


                        {taskList.map((item, index) => (
                             
                            item.status === "done" ? (
                             <div key={index} className="boardPageContentMainDoneCard">
              
                                  <Card   
                                          id = {item?._id}
                                          title = {item?.title} 
                                          priority={item?.priority}
                                          dueDate={item?.dueDate}
                                          checklist={item?.checklist}
                                          status = {item?.status}
                                          getNewStatus={getNewStatus}
                                          getOpenCreateTask={handleOpenCreateTask2}
                                          statusToCloseChecklist = {statusToCloseChecklist}

                                  /> 
                              </div>
                            ):""
                              
                          ))}
                        </div>
                    </div>

                    
               </div>
                </div>
            </div>
        </div>
        <ToastContainer/>
    </>
})

import React, {useState, useEffect} from "react";
import "./card.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CircleIcon from '@mui/icons-material/Circle';
import { updateTaskStatus, deleteTaskApi } from "../APIRoutes";

export const Card = (({id, title, priority, dueDate, checklist, status, getNewStatus, getOpenCreateTask })=>{

    const localStorageUserDetails =  JSON.parse(localStorage.getItem(process.env.REACT_APP_TASK_MANAGER_LOCALHOST_KEY));
  

    const [showMenu, setShowMenu] =  useState(false);
    const [todos, setTodos] = useState(checklist || []);
    const [showTodos, setShowTodos] =  useState(false);
    const [dueDateDisability, setDueDateDisability] = useState({});
    const [formattedDueDate, setFormattedDueDate] = useState("");



    const handleShowMenu = (()=>{

        setShowMenu(!showMenu);
    })

    const handleCheckboxChange = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].isChecked = !updatedTodos[index].isChecked;
        setTodos(updatedTodos);
        checklist = {updatedTodos};
      };

    const handleShowTodos = ()=>{
        
        setShowTodos(!showTodos);
    }

    const formattedDate = (dueDate)=>{
        const date = new Date(dueDate);
        const formattedDate = date.toLocaleDateString('en-US', {
                                month: '2-digit',
                                day: '2-digit',
                                year: 'numeric',
                                });
                        // console.log("fomate",formattedDate);
                                return formattedDate;

        // const milliseconds = new Date(formattedDate).getTime();

        //     return milliseconds;
                            
    }

    const checkDueDateExpiry = ()=>{

        const dueDateMilliSeconds = new Date(formattedDate(dueDate)).getTime();

        // const currentFormattedDate = formattedDate(Date());

        const currentMilliSeconds = new Date(formattedDate(Date())).getTime();

       
        if(dueDateMilliSeconds >= currentMilliSeconds){
            console.log('live',formattedDate(dueDate), dueDateMilliSeconds, currentMilliSeconds);

            return "live";
        }else{
            console.log('expired',formattedDate(dueDate), dueDateMilliSeconds, currentMilliSeconds);

            return "expired";
        }

 
    }
    checkDueDateExpiry();

    const handleChangeStatus = async(newStatus)=>{
        getNewStatus(newStatus);

        const response  = await fetch(updateTaskStatus, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorageUserDetails.token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              {
                taskId: id,
                status: newStatus
            }
            ),
          });
    
            // let data = await response.json()
    }

    const openCreateTask = async(taskId)=>{
        
        getOpenCreateTask(taskId);
    }

    const deleteTask = async (taskId)=>{

        getNewStatus("task deleted");

        const response  = await fetch(`${deleteTaskApi}/${taskId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorageUserDetails.token}`,
              'Content-Type': 'application/json',
            }
           
          });
    
    }

    return (
        <>
            <div className="cardPage">
                <div className="cardPageContent">
                    <div className="cardPageContentHeader">
                        <div className="cardPageContentHeaderPriorityText">
                        {priority === "highPriority" ? 
                        <div>
                        <CircleIcon style = {{ color:"#FF2473",fontSize: 12, marginRight:"7px"}}/>
                        HIGH PRIORITY
                        </div>
                        : priority === "moderatePriority" ?
                        <div>
                        <CircleIcon style = {{ color:"#18B0FF",fontSize: 12, marginRight:"7px"}}/>
                        MODERATE PRIORITY
                        </div>
                        :
                        <div>
                        <CircleIcon style = {{ color:"#63C05B",fontSize: 12, marginRight:"7px"}}/>
                        LOW PRIORITY
                        </div>

                        }
                        
                        </div>


                        <div className="cardPageContentHeaderDropDownButton" onClick={handleShowMenu}>...</div>
                        {showMenu && (
            <div className="cardPageContentMenu">
                <div id = "cardPageContentMenuEdit" onClick={()=> openCreateTask(id)}>Edit</div>
                <div id = "cardPageContentMenuShare">Share</div>
                <div id = "cardPageContentMenuDelete" onClick={()=> deleteTask(id)}>Delete</div>
            </div>
                 )}
                    </div>

                    <div className="cardPageContentTitle">{title}</div>
                    <div className="cardPageContentChecklist">
                        <div className="cardPageContentChecklistText">Checklist (0/0)</div>
                        <div className="cardPageContentChecklistDropDownButton" onClick = {handleShowTodos}>{ showTodos ? <KeyboardArrowUpIcon style = {{ color: "#7b7979" }}/> :<KeyboardArrowDownIcon  style = {{ color: "#7b7979" }}/> }</div>
                    </div>
                    
                    {showTodos && (
                        <div className="cardPageContentChecklistItems">

                        {todos.map((todo, index) => (

                        <div id = "cardPageContentCheckListItem"  key={index}>
                            <input
                            className='cardPageContentCheckListItemCheckBox'
                            type="checkbox"
                            checked={todo?.isChecked}
                            onChange={() => handleCheckboxChange(index)}
                            />

                            <p className='cardPageContentCheckListItemTextArea'>{todo?.task}</p>
                        </div>
                            ))
                        }

                    </div>
                    )}
                 
                    <div className="cardPageContentFooter">
                        <div className="cardPageContentFooterExpiryDate" 
                        style={
                            {
                                backgroundColor: status == "done" ? "#63C05B" : (dueDate ? (checkDueDateExpiry() == "expired" ? "#FF0000"   : null ) 
                                                :  '#ffffff'),
                                color: status == "done" ? "#ffffff" : null             
                            }}>
                
                        {dueDate ? formattedDate(dueDate) : ""}
                       
                        </div>
                        <div className="cardPageContentFooterStatusButton">
                            <button id="cardPageContentFooterStatusBacklog" 
                            style={status == "backlog" ? {display: 'none'} : {}}
                            value = "backlog"
                            onClick = {()=> handleChangeStatus("backlog")}>BACKLOG</button>
                            <button id="cardPageContentFooterStatusTodo" 
                             style={status == "todo" ? {display: 'none'} : {}}
                             value = "todo"
                            onClick = {()=> handleChangeStatus("todo")}>ToDo</button>
                            <button id="cardPageContentFooterStatusProgress" 
                             style={status == "inProgress" ? {display: 'none'} : {}}
                             value = "inProgress"
                            onClick = {()=> handleChangeStatus("inProgress")}>PROGRESS</button>
                            <button id="cardPageContentFooterStatusDone" 
                             style={status == "done" ? {display: 'none'} : {}}
                             value = "done"
                            onClick = {()=> handleChangeStatus("done")}>DONE</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})
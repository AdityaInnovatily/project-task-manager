
import React, {useState, useEffect} from "react";
import "./card.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CircleIcon from '@mui/icons-material/Circle';
import { updateTaskStatus, deleteTaskApi, updateChecklist } from "../APIRoutes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export const Card = (({id, title, priority, dueDate, checklist, status, getNewStatus, getOpenCreateTask, statusToCloseChecklist })=>{
    console.log('kfdsf',checklist);
    const navigate = useNavigate();
    const localStorageUserDetails =  JSON.parse(localStorage.getItem(process.env.REACT_APP_TASK_MANAGER_LOCALHOST_KEY));

    const toastOptions = {
        position: "top-right",
        autoClose: 1500,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      };
   
      useEffect(() => {

        if (!localStorage.getItem(process.env.REACT_APP_TASK_MANAGER_LOCALHOST_KEY)) {
          navigate("/login");
        }
      }, []);

    const [showMenu, setShowMenu] =  useState(false);
    const [todos, setTodos] = useState(checklist || []);
    const [showTodos, setShowTodos] =  useState(false);
    const [dropDownFeatures, setDropDownFeatures] =  useState("");
    const [dueDateDisability, setDueDateDisability] = useState({});
    const [formattedDueDate, setFormattedDueDate] = useState("");

    useEffect(()=>{

        if(statusToCloseChecklist.includes(status)){

            setShowTodos(false);
            
        }   
    },[statusToCloseChecklist]);


    const handleShowMenu = (()=>{

        setShowMenu(!showMenu);
    })

    const handleCheckboxChange = async (index) => {
        const updatedTodos = [...todos];
        let payload = {...updatedTodos[index]};
        updatedTodos[index].isChecked = !updatedTodos[index].isChecked;
        setTodos(updatedTodos);
        checklist = {updatedTodos};


        await fetch(updateChecklist, {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${localStorageUserDetails?.token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              {
                checklistItemId: payload?._id,
                taskId: id,
                // "task" : "updated task",
                isChecked: !payload?.isChecked
            }
            ),
          });

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
                        
                                return formattedDate;

    }

    const checkDueDateExpiry = ()=>{

        const dueDateMilliSeconds = new Date(formattedDate(dueDate)).getTime();

        // const currentFormattedDate = formattedDate(Date());

        const currentMilliSeconds = new Date(formattedDate(Date())).getTime();

       
        if(dueDateMilliSeconds >= currentMilliSeconds){
            // console.log('live',formattedDate(dueDate), dueDateMilliSeconds, currentMilliSeconds);

            return "live";
        }else{
            // console.log('expired',formattedDate(dueDate), dueDateMilliSeconds, currentMilliSeconds);

            return "expired";
        }

 
    }
    checkDueDateExpiry();

    const handleChangeStatus = async(newStatus)=>{
        getNewStatus(newStatus);

        await fetch(updateTaskStatus, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorageUserDetails?.token}`,
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

        await fetch(`${deleteTaskApi}/${taskId}`, {
            method: 'DELETE',
            headers: {
               Authorization: `Bearer ${localStorageUserDetails?.token}`,
              'Content-Type': 'application/json',
            }
           
          });
    
    }

    const handleShareTask = (taskId)=>{

        const tempInput = document.createElement('input');
        tempInput.value = `http://localhost:3000/publicPage/${taskId}`;
    
        // Append the input element to the document
        document.body.appendChild(tempInput);
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // For mobile devices
    
        // Copy the text to the clipboard
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    
        toast.success(`link copied to clipboard`, toastOptions);
    }


    const handleChecklistCount = ((checklist) => {
        
        // getNewStatus("checklist updated");

    console.log("sakfjsa;f", checklist);

        let checkedCount = 0;

        if(checklist.length>0){

         for(let item of checklist){

            if(item.isChecked){
                checkedCount++;
            }
         }

        }

        return checkedCount;

    });

    // handleChecklistCount(checklist);


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
                <div className = {`cardPageContentMenuEdit ${dropDownFeatures === "edit" ? "active" : ""}`} onClick={()=> {
                    setDropDownFeatures("edit");
                    openCreateTask(id)}}>Edit</div>
                <div className = {`cardPageContentMenuShare ${dropDownFeatures === "share" ? "active" : ""}`} onClick = {()=>{
                       setDropDownFeatures("share");
                    handleShareTask(id)}}>Share</div>
                <div className = {`cardPageContentMenuDelete ${dropDownFeatures === "delete" ? "active" : ""}`} onClick={()=> {
                       setDropDownFeatures("delete");
                    deleteTask(id)}}>Delete</div>
            </div>
                 )}
                    </div>
                            
                    <div className="cardPageContentTitle">{title}</div>
                    <div className="cardPageContentChecklist">
                        <div className="cardPageContentChecklistText">
                        Checklist ({handleChecklistCount(todos)}/{todos.length})
                        </div>
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
                                backgroundColor: status === "done" ? "#63C05B" : (dueDate ? (checkDueDateExpiry() === "expired" ? "#FF0000"   : null ) 
                                                :  '#ffffff'),
                                color: status === "done" ? "#ffffff" : null             
                            }}>
                
                        {dueDate ? formattedDate(dueDate) : ""}
                       
                        </div>
                        <div className="cardPageContentFooterStatusButton">
                            <button id="cardPageContentFooterStatusBacklog" 
                            style={status === "backlog" ? {display: 'none'} : {}}
                            value = "backlog"
                            onClick = {()=> handleChangeStatus("backlog")}>BACKLOG</button>
                            <button id="cardPageContentFooterStatusTodo" 
                             style={status === "todo" ? {display: 'none'} : {}}
                             value = "todo"
                            onClick = {()=> handleChangeStatus("todo")}>ToDo</button>
                            <button id="cardPageContentFooterStatusProgress" 
                             style={status === "inProgress" ? {display: 'none'} : {}}
                             value = "inProgress"
                            onClick = {()=> handleChangeStatus("inProgress")}>PROGRESS</button>
                            <button id="cardPageContentFooterStatusDone" 
                             style={status === "done" ? {display: 'none'} : {}}
                             value = "done"
                            onClick = {()=> handleChangeStatus("done")}>DONE</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
})
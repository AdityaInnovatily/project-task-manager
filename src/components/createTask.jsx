import "./createTask.css";
import React, {useState, useEffect} from "react";
import CircleIcon from '@mui/icons-material/Circle';
import { Delete } from '@mui/icons-material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTaskApi, getTaskByIdApi, updateTask } from "../APIRoutes";
import { useNavigate } from "react-router-dom";


export const CreateTask = (({taskId, getNewStatus})=>{
 
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

 
  const [createTask, setCreateTask] = useState({
    title:"",
    priority:"",
    checklist:[],
    dueDate:"",
    status:"todo",
    userId: localStorageUserDetails?.userDetails?._id
  });

  // const [activePriority, setActivePriority] = useState(null);


  useEffect(()=>{

    if(taskId){
      getTaskDetails(taskId);
    }

  },[])

  const getTaskDetails = async (id)=>{

    const response = await fetch(`${getTaskByIdApi}/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorageUserDetails?.token}`,
        'Content-Type': 'application/json',
        // Include any additional headers required for your GET request
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch task data');
    }

    const taskDetails = await response.json();

    // console.log("taskDe",taskDetails[0].title);

  
    setCreateTask(...taskDetails);
    
    // return taskDetails;

  
  }

  // const [todos, setTodos] = useState (taskId ? [...createTask?.checklist] : []);
  const [dueDate, setDueDate] = useState(null);
  const [divStyle, setDivStyle] = useState({});


  
    const handleCancelButton = () => {
      setDivStyle({ display: 'none' });
    };
    

    const handleChange = (event) => {
      setCreateTask({ ...createTask, [event.target.name]: event.target.value });
      console.log(event.target.name, createTask);
    };

    const handleClickPriorityType = (buttonName) => {
      // setActivePriority(buttonName);
      setCreateTask({...createTask, priority: buttonName});
    };

  const addTodo = () => {
    
    setCreateTask({...createTask, checklist :[...createTask?.checklist,{ task: '', isChecked: false }]});

  };

  const handleTextChange = (index, newTask) => {
    const updatedTodos = [...createTask?.checklist];
    updatedTodos[index].task = newTask;
    // setTodos(updatedTodos);
    setCreateTask({...createTask, checklist :[...updatedTodos]});

  };

  const handleCheckboxChange = (index) => {
    const updatedTodos = [...createTask?.checklist];
    updatedTodos[index].isChecked = !updatedTodos[index].isChecked;
    // setTodos(updatedTodos);
    setCreateTask({...createTask, checklist :[...updatedTodos]});
  };

  const deleteTodoItem = (index) => {
    const updatedTodos = [...createTask?.checklist];
    updatedTodos.splice(index, 1);
    // setTodos(updatedTodos);
    setCreateTask({...createTask, checklist :[...updatedTodos]});
  };

  const handleValidation = () => {

    const { title, priority, checklist } = createTask;

    console.log("zzzsafs",createTask);

   
    if (!title) {
      toast.warn("Please, fill title",toastOptions);
    
      return false;
    }

     if (!priority) {
      toast.warn("Please, select task priority",toastOptions);
    
      return false;
    }

     if (checklist.length === 0) {
      toast.warn("Please add minimum 1 task",toastOptions);
    
      return false;
    }
    else{
      for(let [index,checklistitem] of checklist.entries()){
        if(checklistitem?.task.trim() == ""){
          toast.warn(`Please, fill checklist item ${index+1}`,toastOptions);
          return false;
        }
      }
  
    }
    
    return true;

  };

  const handleSaveButton = async (event)=>{
    event.preventDefault();

    const {title, priority, checklist, dueDate, status, userId} = createTask;

    let response;

    if(handleValidation()){
    if(taskId){

       response  = await fetch(updateTask, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorageUserDetails?.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {taskId: taskId,
            title:title,
            priority:priority,
            checklist:checklist,
            dueDate:dueDate,
            status:status,
            userId:userId
          }
        ),
      });
      
    }else{
         response  = await fetch(createTaskApi, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorageUserDetails?.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
           { title:title,
            priority:priority,
            checklist:checklist,
            dueDate:dueDate,
            status:status,
            userId:userId
          }
          ),
        });

      }
  
          let data = await response.json();

    
          if(data?.msg){
              toast.error(data.msg,toastOptions);
          }else{
          
            if(taskId){
              // continue;
              toast.success("task updated successfully", toastOptions);
            
            }else{
              toast.success("task created successfully", toastOptions);
            }

            setTimeout(()=>{
              getNewStatus("render the board page");
            },1200);
            
            setDivStyle({ display: 'none' });
           

          }
         

        }
            
  }


  const formattedDate = ()=>{
    const date = new Date(createTask?.dueDate);
    const formattedDate = date.toLocaleDateString('en-US', {
                            month: '2-digit',
                            day: '2-digit',
                            year: 'numeric',
                            });
                    // console.log("fomate",formattedDate);
                            return formattedDate;
                        
}

    return(<>
     <div className="createTaskPage" style = {divStyle}>

        <div className="createTaskPageContent">
       
        <div className="createTaskPageContentHeader">Title<span>*</span></div>

        <div className="createTaskPageContentTitleInput">
            <input id = "createTaskPageContentTitleInput" name = "title" value = {createTask.title} onChange = {(e)=>handleChange(e)} placeholder="Enter Task Title"/>
        </div>

        <div className="createTaskPageContentSelectPriority">

        <div className="createTaskPageContentSelectPriorityText">Select Priority<span>*</span></div>

        <div className="createTaskPageContentSelectPriorityRadioButtons">
        <button name = "highPriority" value = {createTask?.priority}
        className={`createTaskPageContentSelectPriorityRadioButton ${createTask?.priority === 'highPriority' ? 'active' : ''}`}
        onClick={() => handleClickPriorityType('highPriority')}
      >
       <CircleIcon style = {{ color:"#FF2473",fontSize: 12, marginRight:"7px"}}/>
  
        HIGH PRIORITY
      </button>

      <button name = "moderatePriority" value = {createTask?.priority}
        className={`createTaskPageContentSelectPriorityRadioButton ${createTask?.priority === 'moderatePriority' ? 'active' : ''}`}
        onClick={() => handleClickPriorityType('moderatePriority')}
      >
       <CircleIcon style = {{ color:"#18B0FF",fontSize: 12, marginRight:"7px"}}/>
  
        MODERATE PRIORITY
      </button>

      <button name = "lowPriority" value = {createTask?.priority}
        className={`createTaskPageContentSelectPriorityRadioButton ${createTask?.priority === 'lowPriority' ? 'active' : ''}`}
        onClick={() => handleClickPriorityType('lowPriority')}
      >
       <CircleIcon style = {{ color:"#63C05B",fontSize: 10, marginRight:"7px"}}/>
  
        LOW PRIORITY
      </button>

        </div>

        </div>
        
        <div className="createTaskPageContentCheckList">
        <div className="createTaskPageContentCheckListText">Checklist (0/0)<span>*</span></div>

        <div className="createTaskPageContentCheckListItems">
      
        {createTask?.checklist.map((todo, index) => (
         
         <div id = "createTaskPageContentCheckListItem"  key={index}>
            <input
              className='createTaskPageContentCheckListItemCheckBox'
              type="checkbox"
              checked={todo?.isChecked}
              onChange={() => handleCheckboxChange(index)}
            />

            {/* <CheckBoxIcon style={{ border: "1px solid black", color:"#17A2B8"}}/> */}

            <input
              className='createTaskPageContentCheckListItemTextArea'
              type="text"
              placeholder='Type...'
              value={todo?.task}
              onChange={(e) => handleTextChange(index, e.target.value)}
            />
            <Delete className = "createTaskPageContentCheckListItemDeleteButton" onClick={() => deleteTodoItem(index)}/>
          </div>
          
        ))
        }
        
        
        </div>

        <button className="createTaskPageContentCheckListItemAddButton" onClick={addTodo}> <span>+</span> Add New</button>
      

        </div>


        
        <div className="createTaskPageContentDateAndButtons">

            <div className="createTaskPageContentDate">
              
                <DatePicker 
                placeholderText="Select Due Date"
                id="createTaskPageContentDate"
                selected={dueDate} 
                value =  {Boolean(createTask?.dueDate) ? formattedDate() :"" }
                      
                onChange={(date) => {setDueDate(date); setCreateTask({...createTask, dueDate :date});}} />
             
            </div>
           

            <div className="createTaskPageContentButtons">
                <button id= "createTaskPageContentButtonCancel" onClick={handleCancelButton}>Cancel</button>
                <button id= "createTaskPageContentButtonSave" onClick={handleSaveButton}>Save</button>
            </div>

        </div>
        

        </div>
    </div>
    <ToastContainer/>
    </>
    )
})
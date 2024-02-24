import "./createTask.css";
import React, {useState, useEffect} from "react";
import CircleIcon from '@mui/icons-material/Circle';
import { Delete } from '@mui/icons-material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

  

export const CreateTask = (()=>{


    const [activeButton, setActiveButton] = useState(null);
    const [todos, setTodos] = useState([]);
    const [startDate, setStartDate] = useState();

    const handleClickPriorityType = (buttonName) => {
      setActiveButton(buttonName);
    };

  const addTodo = () => {
    console.log("todos", todos);
    setTodos([...todos, { task: '', isChecked: false }]);
  };

  const handleTextChange = (index, newTask) => {
    const updatedTodos = [...todos];
    updatedTodos[index].task = newTask;
    setTodos(updatedTodos);
  };

  const handleCheckboxChange = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isChecked = !updatedTodos[index].isChecked;
    setTodos(updatedTodos);
  };

  const deleteTodoItem = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };


    return(<>
     <div className="createTaskPage">

        <div className="createTaskPageContent">
        
        <div className="createTaskPageContentHeader">Title<span>*</span></div>

        <div className="createTaskPageContentTitleInput">
            <input id = "createTaskPageContentTitleInput" placeholder="Enter Task Title"/>
        </div>

        <div className="createTaskPageContentSelectPriority">

        <div className="createTaskPageContentSelectPriorityText">Select Priority<span>*</span></div>

        <div className="createTaskPageContentSelectPriorityRadioButtons">
        <button
        className={`createTaskPageContentSelectPriorityRadioButton1 ${activeButton === 'button1' ? 'active' : ''}`}
        onClick={() => handleClickPriorityType('button1')}
      >
       <CircleIcon style = {{ color:"#FF2473",fontSize: 12, marginRight:"7px"}}/>
  
        HIGH PRIORITY
      </button>

      <button
        className={`createTaskPageContentSelectPriorityRadioButton2 ${activeButton === 'button2' ? 'active' : ''}`}
        onClick={() => handleClickPriorityType('button2')}
      >
       <CircleIcon style = {{ color:"#18B0FF",fontSize: 12, marginRight:"7px"}}/>
  
        MODERATE PRIORITY
      </button>

      <button
        className={`createTaskPageContentSelectPriorityRadioButton3 ${activeButton === 'button3' ? 'active' : ''}`}
        onClick={() => handleClickPriorityType('button3')}
      >
       <CircleIcon style = {{ color:"#63C05B",fontSize: 10, marginRight:"7px"}}/>
  
        LOW PRIORITY
      </button>
        </div>

        </div>

        <div className="createTaskPageContentCheckList">
        <div className="createTaskPageContentCheckListText">Checklist (0/0)<span>*</span></div>

        <div className="createTaskPageContentCheckListItems">
      
        {todos.map((todo, index) => (
         
         <div id = "createTaskPageContentCheckListItem"  key={index}>
            <input
              className='createTaskPageContentCheckListItemCheckBox'
              type="checkbox"
              checked={todo.isChecked}
              onChange={() => handleCheckboxChange(index)}
            />

            {/* <CheckBoxIcon style={{ border: "1px solid black", color:"#17A2B8"}}/> */}

            <input
              className='createTaskPageContentCheckListItemTextArea'
              type="text"
              placeholder='Type...'
              value={todo.task}
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
                selected={startDate} 
                onChange={(date) => setStartDate(date)} />
             
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
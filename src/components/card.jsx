
import React, {useState, useEffect} from "react";
import "./card.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CircleIcon from '@mui/icons-material/Circle';

export const Card = (({id, title, priority, dueDate, checklist, status})=>{


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

    const formattedDate = ()=>{
        const date = new Date(dueDate);
        const formattedDate = date.toLocaleDateString('en-US', {
                                month: '2-digit',
                                day: '2-digit',
                                year: 'numeric',
                                });
                        console.log("fomate",formattedDate);
                                return formattedDate;
                            
    }

    const handleChangeStatus = ()=>{
        
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
                <div id = "cardPageContentMenuEdit">Edit</div>
                <div id = "cardPageContentMenuShare">Share</div>
                <div id = "cardPageContentMenuDelete">Delete</div>
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
                        <div className="cardPageContentFooterExpiryDate" style = {dueDateDisability}>
                
                        {Boolean(dueDate) ? formattedDate() : (()=> setDueDateDisability({ display: 'none' })) }
                        </div>
                        <div className="cardPageContentFooterStatusButton">
                            <button id="cardPageContentFooterStatusBacklog" onClick = {handleChangeStatus}>BACKLOG</button>
                            <button id="cardPageContentFooterStatusProgress" onClick = {handleChangeStatus}>PROGRESS</button>
                            <button id="cardPageContentFooterStatusDone" onClick = {handleChangeStatus}>DONE</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})
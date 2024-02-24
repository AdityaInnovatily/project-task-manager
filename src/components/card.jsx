
import React, {useState, useEffect} from "react";
import "./card.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const Card = (()=>{


    const [showMenu, setShowMenu] =  useState(false);
    const [todos, setTodos] = useState([{ task: 'Apple', isChecked: true },{ task: 'Apple', isChecked: false },{ task: 'Apple', isChecked: true },{ task: 'Apple', isChecked: false }]);
    const [showTodos, setShowTodos] =  useState(false);

    const handleShowMenu = (()=>{

        setShowMenu(!showMenu);
    })

    const handleCheckboxChange = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].isChecked = !updatedTodos[index].isChecked;
        setTodos(updatedTodos);
      };

    const handleShowTodos = ()=>{
        
        setShowTodos(!showTodos);
    }

    return (
        <>
            <div className="cardPage">
                <div className="cardPageContent">
                    <div className="cardPageContentHeader">
                        <div className="cardPageContentHeaderPriorityText">LOW PRIORITY</div>
                        <div className="cardPageContentHeaderDropDownButton" onClick={handleShowMenu}>...</div>
                        {showMenu && (
            <div className="cardPageContentMenu">
                <div id = "cardPageContentMenuEdit">Edit</div>
                <div id = "cardPageContentMenuShare">Share</div>
                <div id = "cardPageContentMenuDelete">Delete</div>
            </div>
                 )}
                    </div>

                    <div className="cardPageContentTitle">Typography change in the First two screens of the</div>
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
                            checked={todo.isChecked}
                            onChange={() => handleCheckboxChange(index)}
                            />

                            <p className='cardPageContentCheckListItemTextArea'>{todo.task}</p>
                        </div>
                            ))
                        }

                    </div>
                    )}


                  
                    <div className="cardPageContentFooter">
                        <div className="cardPageContentFooterExpiryDate">Feb</div>
                        <div className="cardPageContentFooterStatusButton">
                            <button id="cardPageContentFooterStatusBacklog">BACKLOG</button>
                            <button id="cardPageContentFooterStatusProgress">PROGRESS</button>
                            <button id="cardPageContentFooterStatusDone">DONE</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
})
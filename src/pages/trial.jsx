import React, { useState } from 'react';
import "./trial.css";
// import Delete from "../components/delete";
import { Delete } from '@mui/icons-material';

function Trial() {
 
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    setTodos([...todos, { text: '', completed: false }]);
  };

  const handleTextChange = (index, newText) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = newText;
    setTodos(updatedTodos);
  };

  const handleCheckboxChange = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };
// let index = 2;
  return (
    <div className="App">
     <div className='createTaskPageContent'>

     <div className="createTaskPageContentCheckList">
    
        {todos.map((todo, index) => (
          <div className = "createTaskPageContentCheckListItem" id = {`createTaskPageContentCheckListItem${index}`} key={index}>
            <input
              className='createTaskPageContentCheckListItemCheckBox'
              type="checkbox"
              // style={{ width: '20px', height: '20px' }}
              checked={todo?.completed}
              onChange={() => handleCheckboxChange(index)}
            />
            <input
              className='createTaskPageContentCheckListItemTextArea'
              type="text"
              placeholder='Type...'
              value={todo?.text}
              onChange={(e) => handleTextChange(index, e.target.value)}
            />
            <Delete className = "createTaskPageContentCheckListItemDeleteButton" onClick={() => deleteTodo(index)}/>
          </div>
        ))}
        
        </div>

        <button onClick={addTodo}>Add Todo</button>
      
      </div>

    </div>
  );
}

export default Trial;

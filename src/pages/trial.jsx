import React, { useState } from 'react';
import "./trial.css";
// import Delete from "../components/delete";
// import { Delete } from '@mui/icons-material';

function Trial() {
 
  // const [countValue, getCountValue] = useState(0);

  let checklist = [{task: "task1", isChecked: true},{task: "task2", isChecked: false}];

  const [value, setValue] = useState([...checklist]);

  
  return (
    <div className="App">
    
      {/* <Component1/> */}
      
    </div>
  );
}

export default Trial.js;



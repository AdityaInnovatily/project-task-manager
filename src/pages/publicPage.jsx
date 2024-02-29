import React, {useState, useEffect} from "react";
import "./publicPage.css";
import { getTaskByIdPublicApi, updateChecklistPublic } from "../APIRoutes";
import CircleIcon from '@mui/icons-material/Circle';
import { useParams } from "react-router-dom";



export const PublicPage = (()=>{

    const { taskId } = useParams();
 

    const [taskDetails, setTaskDetails] = useState({
        title:"",
        priority:"",
        checklist:[],
        dueDate:"",
        status:"",
        userId: ""
    });

    useEffect(()=>{
        
          const getTaskDetails = async (id)=>{
        
            const response = await fetch(`${getTaskByIdPublicApi}/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                // Include any additional headers required for your GET request
              },
            });
        
            if (!response.ok) {
              throw new Error('Failed to fetch task data');
            }
        
            const taskDetails = await response.json();
        
            console.log("taskDe",taskDetails);
        
          
            setTaskDetails(...taskDetails);
            
          }

          getTaskDetails(taskId);
    },[]);


    const handleChecklistCount = ((checklist) => {

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


    const handleCheckboxChange = async (index) => {
        const updatedTodos = [...taskDetails?.checklist];
        let payload = {...updatedTodos[index]};
        updatedTodos[index].isChecked = !updatedTodos[index].isChecked;
        setTaskDetails({...taskDetails, checklist : [...updatedTodos]});
        // checklist = {updatedTodos};


        await fetch(updateChecklistPublic, {
            method: 'POST',
            headers: {
            //   Authorization: `Bearer ${localStorageUserDetails.token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              {
                checklistItemId: payload?._id,
                taskId: taskId,
                // "task" : "updated task",
                isChecked: !payload?.isChecked
            }
            ),
          });

      };


      const formattedDate = (dueDate)=>{
        const date = new Date(dueDate);
        const formattedDate = date.toLocaleDateString('en-US', {
                                month: '2-digit',
                                day: '2-digit',
                                year: 'numeric',
                                });
                        
                                return formattedDate;

    }

    

    return <>
    <div className="publicPage">
   
    <div className= "publicPageLogoHeader"> 
    <img id = "logoImage" src={process.env.PUBLIC_URL + '/logo.png'} alt="Example" />
        
    Pro Manage
    </div>
  
    
        <div className="publicPageContent">
            <div className="publicPageContentHeader">
                <div className="publicPageContentHeaderPriorityText">
                {taskDetails?.priority === "highPriority" ? 
                <div className="publicPageContentHeaderPriorityText2">
                <CircleIcon style = {{ color:"#FF2473",fontSize: 12, marginRight:"7px"}}/>
                HIGH PRIORITY
                </div>
                : taskDetails?.priority === "moderatePriority" ?
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

            </div>

            <div className="publicPageContentTitle">{taskDetails?.title}</div>
            <div className="publicPageContentChecklist">
                <div className="publicPageContentChecklistText">
                Checklist ({handleChecklistCount([...taskDetails?.checklist])}/{taskDetails?.checklist.length})
                 </div>
              
            </div>
            

                <div className="publicPageContentChecklistItems">

                {taskDetails?.checklist.map((todo, index) => (

                <div id = "publicPageContentCheckListItem"  key={index}>
                    <input
                    className='publicPageContentCheckListItemCheckBox'
                    type="checkbox"
                    checked={todo?.isChecked}
                    onChange={() => handleCheckboxChange(index)}
                    />

                    <p className='publicPageContentCheckListItemTextArea'>{todo?.task}</p>
                </div>
                    ))
                }

            </div>
        
         
            <div className="publicPageContentFooter" style={{display : taskDetails?.dueDate ? '' : 'none'}}>
                    Due Date
                <div className="publicPageContentFooterExpiryDate">
        
                 {taskDetails?.dueDate ? formattedDate(taskDetails?.dueDate) : ""}
               
                </div>
               
            </div>
        </div>
    </div>


</>
})
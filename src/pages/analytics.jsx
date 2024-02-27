import "./analytics.css";
import React, {useState,useEffect} from "react";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import SideBar from "../components/sideBar";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CircleIcon from '@mui/icons-material/Circle';
import { analytics } from "../APIRoutes";
  
export const Analytics = (()=>{

    const localStorageUserDetails =  JSON.parse(localStorage.getItem(process.env.REACT_APP_TASK_MANAGER_LOCALHOST_KEY));
   
    const [analyticsDetails, setAnalyticsDetails] = useState({
        backlog :0,
        todo:0,
        inProgress:0,
        done:0,
        lowPriority:0,
        moderatePriority:0,
        highPriority:0,
        dueDateTasks:0
    });


    useEffect(()=>{
        const getAnalytics = async ()=>{
            console.log('dsfsa',`${analytics}/${localStorageUserDetails?.userDetails?._id}`);
            const response = await fetch(`${analytics}/${localStorageUserDetails?.userDetails?._id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                // Include any additional headers required for your GET request
              },
            });
        
            if (!response.ok) {
              throw new Error('Failed to fetch task data');
            }
        
            const analyticsDetails = await response.json();
        
          console.log("analyticsDetials",analyticsDetails);
            setAnalyticsDetails({...analyticsDetails});
            
    
          }

          getAnalytics();

    },[]);


    return <>


    <div className="analyticsPage">
   
    <SideBar/> 


    <div className="analyticsPageContent">
    
        <div className="analyticsPageContentHeader"> <p>Analytics</p> </div>


<div className="analyticsPageContentLeftRight">
        <div className="analyticsPageLeft">

<div className="analyticsPageLeftInner">
    <div className="analyticsPageLeftInnerLeft">
    <CircleIcon style = {{ color:"#90C4CC",fontSize: 15}}/>
    <p id = "analyticsType">Backlog Tasks </p>
    </div>

    <p id = "analyticsTypeValue">
    {analyticsDetails?.backlog <10 ? "0" +analyticsDetails?.backlog: analyticsDetails?.backlog}
    </p>
    </div>

    <div className="analyticsPageLeftInner">
    <div className="analyticsPageLeftInnerLeft">
    <CircleIcon style = {{ color:"#90C4CC",fontSize: 15}}/>
    <p id = "analyticsType">To do Tasks</p>
    </div>

    <p id = "analyticsTypeValue">
    {analyticsDetails?.todo <10 ? "0" +analyticsDetails?.todo: analyticsDetails?.todo}
    </p>
    </div>

    <div className="analyticsPageLeftInner">
    <div className="analyticsPageLeftInnerLeft">
    <CircleIcon style = {{ color:"#90C4CC",fontSize: 15}}/>
    <p id = "analyticsType">In-Progres Tasks</p>
    </div>

    <p id = "analyticsTypeValue">
    {analyticsDetails?.inProgress <10 ? "0" +analyticsDetails?.inProgress: analyticsDetails?.inProgress}
    </p>
    </div>

    <div className="analyticsPageLeftInner">
    <div className="analyticsPageLeftInnerLeft">
    <CircleIcon style = {{ color:"#90C4CC",fontSize: 15}}/>
    <p id = "analyticsType">Completed Tasks</p>
    </div>

    <p id = "analyticsTypeValue">
    {analyticsDetails?.done <10 ? "0" +analyticsDetails?.done: analyticsDetails?.done}
    </p>
    </div>
    
</div>


<div className="analyticsPageLeft">

<div className="analyticsPageLeftInner">
    <div className="analyticsPageLeftInnerLeft">
    <CircleIcon style = {{ color:"#90C4CC",fontSize: 15}}/>
    <p id = "analyticsType">Low Priority</p>
    </div>

    <p id = "analyticsTypeValue">
    {analyticsDetails?.lowPriority <10 ? "0" +analyticsDetails?.lowPriority : analyticsDetails?.lowPriority}
    </p>
    </div>

    <div className="analyticsPageLeftInner">
    <div className="analyticsPageLeftInnerLeft">
    <CircleIcon style = {{ color:"#90C4CC",fontSize: 15}}/>
    <p id = "analyticsType">Moderate Priority</p>
    </div>

    <p id = "analyticsTypeValue">
    {analyticsDetails?.moderatePriority <10 ? "0" +analyticsDetails?.moderatePriority: analyticsDetails?.moderatePriority}
    </p>

    </div>

    <div className="analyticsPageLeftInner">
    <div className="analyticsPageLeftInnerLeft">
    <CircleIcon style = {{ color:"#90C4CC",fontSize: 15}}/>
    <p id = "analyticsType">High Priority</p>
    </div>

    <p id = "analyticsTypeValue">
    {analyticsDetails?.highPriority <10 ? "0" +analyticsDetails?.highPriority: analyticsDetails?.highPriority}
    </p>
    </div>

    <div className="analyticsPageLeftInner">
    <div className="analyticsPageLeftInnerLeft">
    <CircleIcon style = {{ color:"#90C4CC",fontSize: 15}}/>
    <p id = "analyticsType">Due Date Tasks</p>
    </div>

    <p id = "analyticsTypeValue">
    {analyticsDetails?.dueDateTasks <10 ? "0" +analyticsDetails?.dueDateTasks: analyticsDetails?.dueDateTasks}
    </p>

    </div>
    
</div>

</div>

    </div>

     
    </div>


    </>
})
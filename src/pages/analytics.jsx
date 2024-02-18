import "./analytics.css";
import React, {useEffect} from "react";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import SideBar from "../components/sideBar";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CircleIcon from '@mui/icons-material/Circle';
  
export const Analytics = (()=>{


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
    <p id = "analyticsType">Backing Tasks</p>
    </div>

    <p id = "analyticsTypeValue">00</p>

    </div>

    <div className="analyticsPageLeftInner">
    <div className="analyticsPageLeftInnerLeft">
    <CircleIcon style = {{ color:"#90C4CC",fontSize: 15}}/>
    <p id = "analyticsType">To do Tasks</p>
    </div>

    <p id = "analyticsTypeValue">00</p>

    </div>

    <div className="analyticsPageLeftInner">
    <div className="analyticsPageLeftInnerLeft">
    <CircleIcon style = {{ color:"#90C4CC",fontSize: 15}}/>
    <p id = "analyticsType">In-Progres Tasks</p>
    </div>

    <p id = "analyticsTypeValue">00</p>

    </div>

    <div className="analyticsPageLeftInner">
    <div className="analyticsPageLeftInnerLeft">
    <CircleIcon style = {{ color:"#90C4CC",fontSize: 15}}/>
    <p id = "analyticsType">Completed Tasks</p>
    </div>

    <p id = "analyticsTypeValue">00</p>

    </div>
    
</div>


<div className="analyticsPageLeft">

<div className="analyticsPageLeftInner">
    <div className="analyticsPageLeftInnerLeft">
    <CircleIcon style = {{ color:"#90C4CC",fontSize: 15}}/>
    <p id = "analyticsType">Low Priority</p>
    </div>

    <p id = "analyticsTypeValue">00</p>

    </div>

    <div className="analyticsPageLeftInner">
    <div className="analyticsPageLeftInnerLeft">
    <CircleIcon style = {{ color:"#90C4CC",fontSize: 15}}/>
    <p id = "analyticsType">Moderate Priority</p>
    </div>

    <p id = "analyticsTypeValue">00</p>

    </div>

    <div className="analyticsPageLeftInner">
    <div className="analyticsPageLeftInnerLeft">
    <CircleIcon style = {{ color:"#90C4CC",fontSize: 15}}/>
    <p id = "analyticsType">High Priority</p>
    </div>

    <p id = "analyticsTypeValue">00</p>

    </div>

    <div className="analyticsPageLeftInner">
    <div className="analyticsPageLeftInnerLeft">
    <CircleIcon style = {{ color:"#90C4CC",fontSize: 15}}/>
    <p id = "analyticsType">Due Date Tasks</p>
    </div>

    <p id = "analyticsTypeValue">00</p>

    </div>
    
</div>

</div>

    </div>

     
    </div>


    </>
})
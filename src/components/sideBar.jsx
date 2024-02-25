import "./sideBar.css";
import { useNavigate } from "react-router-dom";
import React, {useState, useEffect} from "react";
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Logout } from "./logout";


export default function SideBar(){

    const navigate = useNavigate();

    const [isLogoutComponentPopup, setLogoutComponentPopup] = useState(false);

    
    const handleLogoutButton = async () => {
      console.log('clicked');
     
      setLogoutComponentPopup(!isLogoutComponentPopup);
     
    };


    const handleCancelButton = () => {
      setLogoutComponentPopup(false);
    };

    
    return <>
    <div className = "navbarPage">

    <div className="navbarHeader">
    <div id= "navbarHeader"> <ViewInArOutlinedIcon/>Pro Manage</div>
    </div>

<div className="navbarSidebar">
  <div id = "board" onClick = {()=>{navigate("/")}}><SpaceDashboardOutlinedIcon/> Board</div>
  <div id = "analytics" onClick = {()=>{navigate("/analytics")}}><StorageOutlinedIcon/> Analytics</div>
  <div id = "settings" onClick = {()=>{navigate("/settings",{state:{
              editQuizId:"",
              editQuizName:"",
              editQuizType:""
              }
            })}}> <SettingsOutlinedIcon/> Settings</div>
</div>


<div className="navbarLogOut">


    
    <div id= "logOutBtn" onClick={handleLogoutButton}> <LogoutOutlinedIcon/>Log out</div>
{/* 
    {isLogoutComponentPopup && (
        
      <Logout/>
      )} */}

      {isLogoutComponentPopup && <Logout onCancel={handleCancelButton} />}
      
    </div>

</div>

    </>
}
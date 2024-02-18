import "./sideBar.css";
import { useNavigate } from "react-router-dom";
import React, {useEffect} from "react";
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function SideBar(){

    const navigate = useNavigate();

    // useEffect(() => {
    //   const checkLoginStatus = async () => {
    //     if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
    //       navigate("/login");
    //     }
    //   };
  
    //   checkLoginStatus();
    // }, [navigate]);
    
    const handleClick = async () => {
      console.log('clicked');
     
      let localStorageKey = process.env.REACT_APP_LOCALHOST_KEY;
      localStorage.removeItem(localStorageKey);
    
      navigate("/login");
     
    };
    
    return <>
    <div className = "navbarPage">

    <div className="navbarHeader">
    <div id= "navbarHeader"> <ViewInArOutlinedIcon/> Pro Manage</div>
    </div>

<div className="navbarSidebar">
  <div id = "board" onClick = {()=>{navigate("/")}}><SpaceDashboardOutlinedIcon/> Board</div>
  <div id = "analytics" onClick = {()=>{navigate("/analytics")}}><StorageOutlinedIcon/> Analytics</div>
  <div id = "settings" onClick = {()=>{navigate("/createQuiz",{state:{
              editQuizId:"",
              editQuizName:"",
              editQuizType:""
              }
            })}}> <SettingsOutlinedIcon/> Settings</div>
</div>


<div className="navbarLogOut">


    
    <div id= "logOutBtn" onClick={handleClick}> <LogoutOutlinedIcon/>Log out</div>

   
    </div>

</div>

    </>
}
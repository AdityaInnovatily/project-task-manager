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
    
  const localStorageUserDetails =  JSON.parse(localStorage.getItem(process.env.REACT_APP_TASK_MANAGER_LOCALHOST_KEY));
  

  useEffect(() => {

      if (!localStorage.getItem(process.env.REACT_APP_TASK_MANAGER_LOCALHOST_KEY)) {
        navigate("/login");
      }
    }, []);


    const [isLogoutComponentPopup, setLogoutComponentPopup] = useState(false);
    const [seletedOption, setSelectedOption] = useState("");

    
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
    <div id= "navbarHeader"> 
    <img id = "sideBarLogo" src={process.env.PUBLIC_URL + '/logo.png'} alt="Example" />
        
    Pro Manage</div>
    </div>

<div className="navbarSidebar">
  <div className = {`boardClass ${seletedOption === "board" ? "active" : ""}`} 
  onClick = {()=>{
    setSelectedOption("board");
   
    navigate("/");

    }}><SpaceDashboardOutlinedIcon/> Board</div>
  <div className = {`analyticsClass ${seletedOption === "analytics" ? "active" : ""}`} onClick = {()=>{
       setSelectedOption("analytics");
       navigate("/analytics")}}><StorageOutlinedIcon/> Analytics</div>
  <div className = {`settingsClass ${seletedOption === "settings" ? "active" : ""}`} onClick = {()=>{
       setSelectedOption("settings");
       navigate("/settings")}}> <SettingsOutlinedIcon/> Settings</div>
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
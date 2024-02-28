import React, {useEffect, useState} from 'react';
import SideBar from "../components/sideBar"
import "./settings.css";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { updateUserApi } from '../APIRoutes';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Settings = (()=>{

  const localStorageUserDetails =  JSON.parse(localStorage.getItem(process.env.REACT_APP_TASK_MANAGER_LOCALHOST_KEY));
  
  const toastOptions = {
    position: "top-right",
    autoClose: 1500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };

    const [userDetails, setUserDetails] = useState({
      name: localStorageUserDetails?.userDetails?.name,
      oldPassword: "",
      newPassword: ""
    });
    
   
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
    const [nameErorr, setNameError] = useState("");
    const [oldPasswordErorr, setOldPasswordError] = useState("");
    const [newPasswordErorr, setNewPasswordError] = useState("");
    

    const validateForm = () => {
      const { name, oldPassword, newPassword } = userDetails;

      // console.log('asdfs',name);
      if (name === "") {
    
        setNameError("name is required");
       
        return false;
  
      } else{
  
          setNameError("");
  
      } 
      
      if ( newPassword?.length>0 && newPassword.length < 8) {
  
        setNewPasswordError("Password length must be greater than 7");
      
        return false;
  
      }
      else{
        setNewPasswordError("");
      }
  
      return true;
    };


    const handleUpdate = async () => {
        // Handle registration logic here

        if(validateForm()){
          const response  = await fetch(updateUserApi, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${localStorageUserDetails?.token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              {
                userId: localStorageUserDetails?.userDetails?._id,
                name: userDetails?.name,
                oldPassword: userDetails?.oldPassword,
                newPassword: userDetails?.newPassword
              
            }
            ),
          });


          // console.log("dsfds11",response);
          let data = await response.json();

          if(data.msg == "wrong password"){

           setOldPasswordError(data.msg);

          }else{
            setOldPasswordError("");

            let dataWithToken = {
              token:localStorageUserDetails?.token,
              userDetails: data
            }
  
            localStorage.setItem(
              process.env.REACT_APP_TASK_MANAGER_LOCALHOST_KEY,
              JSON.stringify(dataWithToken)
            );
            
            // setNewPasswordError("Password Updated Successfully");
            
            if(userDetails?.newPassword){
            toast.success("Password Updated Successfully", toastOptions);
            }else{
              toast.success("Name Updated Successfully", toastOptions);
            }
          }

        }
        
      };

    const showPassword = () => {

        setPasswordVisible(!isPasswordVisible);
       
    }

    const showNewPassword = () => {

        setNewPasswordVisible(!isNewPasswordVisible);
    }


    const handleChange = (event) => {
      setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
      // console.log(event.target.name, createTask);
    };


    return <>

    <div className="settingsPage">

        <SideBar/>

        <div className="settingsPageContent">

            <p id= "settingsPageContentHeader">Settings</p>

            <div className="settingsPageContentForm">

            <div className='registerPageFormContentNameContent'>
            <div className='registerPageFormContentName'>
          <input
            type="text"
            id="registerPageFormContentName"
            placeholder='&#xf007;   Name'
            name = "name"
            value={userDetails?.name}
            onChange = {(e)=>handleChange(e)}
          />
           <VisibilityOutlinedIcon style={{color:"#ffffff", fontSize: 20 }}/>
      
        </div>
       
        <p id = "registerPageFormContentNameError">{nameErorr}</p>
      
        </div>


        <div className='registerPageFormContentPasswordContent'>
        <div className='registerPageFormContentPassword'>
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="registerPageFormContentPassword"
            placeholder='&#xf023;   Old Password'
            name = "oldPassword"
            value={userDetails?.oldPassword}
            onChange = {(e)=>handleChange(e)}
          />
     
     
         {
            isPasswordVisible ? 
            (<VisibilityOutlinedIcon onClick = {showPassword} style={{color:"#828282", fontSize: 20 }}/>)
            
         :
         (<VisibilityOffIcon onClick = {showPassword} style={{color:"#828282", fontSize: 20 }}/>)
         
      
         }

        </div>

        <p id = "registerPageFormContentPasswordError">{oldPasswordErorr}</p>
      
        </div>

        <div className='registerPageFormContentConfirmPasswordContent'>
        <div className='registerPageFormContentConfirmPassword'>
          <input
            type={isNewPasswordVisible ? "text" : "password"}
            id="registerPageFormContentConfirmPassword"
            placeholder='&#xf023;   New Password'
            name = "newPassword"
            value={userDetails?.newPassword}
            // onChange={(e) => setNewPassword(e.target.value)}
            onChange = {(e)=>handleChange(e)}
          />
     
     {
        isNewPasswordVisible ? 
            (<VisibilityOutlinedIcon onClick = {showNewPassword} style={{color:"#828282", fontSize: 20 }}/>)
            
         :
         (<VisibilityOffIcon onClick = {showNewPassword} style={{color:"#828282", fontSize: 20 }}/>)
         
      
         }
      
        </div>

        <p id = "registerPageFormContentConfirmPasswordError">{newPasswordErorr}</p>
      
        </div>



            </div>

            <button type = "button" className="registerPageFormContentRegisterButton" onClick={handleUpdate}>
            Update
          </button>


        </div>
    </div>
   
         <ToastContainer/>
    </>
})
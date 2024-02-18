import React, {useState} from 'react';
import SideBar from "../components/sideBar"
import "./settings.css";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



export const Settings = (()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  

    const handleUpdate = () => {
        // Handle registration logic here
        console.log('Registering with email:', email, 'and password:', password);
      };

    const showPassword = () => {

        setPasswordVisible(!isPasswordVisible);
       
    }

    const showNewPassword = () => {

        setNewPasswordVisible(!isNewPasswordVisible);
    }

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
           <VisibilityOutlinedIcon style={{color:"#ffffff", fontSize: 20 }}/>
      
        </div>
       
        <p id = "registerPageFormContentNameError">js;fls;fds</p>
      
        </div>


        <div className='registerPageFormContentPasswordContent'>
        <div className='registerPageFormContentPassword'>
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="registerPageFormContentPassword"
            placeholder='&#xf023;   Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
     
         {
            isPasswordVisible ? 
            (<VisibilityOutlinedIcon onClick = {showPassword} style={{color:"#828282", fontSize: 20 }}/>)
            
         :
         (<VisibilityOffIcon onClick = {showPassword} style={{color:"#828282", fontSize: 20 }}/>)
         
      
         }

        </div>

        <p id = "registerPageFormContentPasswordError">js;fls;fds</p>
      
        </div>

        <div className='registerPageFormContentConfirmPasswordContent'>
        <div className='registerPageFormContentConfirmPassword'>
          <input
            type={isNewPasswordVisible ? "text" : "password"}
            id="registerPageFormContentConfirmPassword"
            placeholder='&#xf023;   Confirm Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
     
     {
        isNewPasswordVisible ? 
            (<VisibilityOutlinedIcon onClick = {showNewPassword} style={{color:"#828282", fontSize: 20 }}/>)
            
         :
         (<VisibilityOffIcon onClick = {showNewPassword} style={{color:"#828282", fontSize: 20 }}/>)
         
      
         }
      
        </div>

        <p id = "registerPageFormContentConfirmPasswordError">js;fls;fds</p>
      
        </div>



            </div>

            <button type = "button" className="registerPageFormContentRegisterButton" onClick={handleUpdate}>
            Update
          </button>


        </div>
    </div>
   

    </>
})
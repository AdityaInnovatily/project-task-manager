import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import "./register.css";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {registerRoute} from "../APIRoutes";
import { useNavigate, Link } from "react-router-dom";

export const Register = (()=>{

  const localStorageUserDetails =  JSON.parse(localStorage.getItem(process.env.REACT_APP_TASK_MANAGER_LOCALHOST_KEY));
 
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 1500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  


  useEffect(() => {
    if (localStorageUserDetails) {  

      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    // console.log(event.target.value, values);
  };

  const handleValidation = () => {
    console.log("values",values);

    const { password, confirmPassword, name, email } = values;

    console.log("pas",name,email,password,confirmPassword);
    if (password !== confirmPassword) {
      setPasswordError("Password and Confirm password must be same");
      setConfirmPasswordError("Password and Confirm password must be same");

      return false;
    }else{
      setPasswordError("");
      setConfirmPasswordError("");
    }

     if (name.length < 3) {
      setNameError("username should be greater than 3 characters.");
      return false;
    } 
    else{
      setNameError("");
    }

     if (password.length < 8) {

      setPasswordError("Password must be equal or greater than 8 characters")
     
      return false;
    }else{
      setPasswordError("");
    }

     if (email == "") {

      setEmailError("Email is required");
      return false;
    }
    else{
      setEmailError("");
    }

    return true;

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (handleValidation()) {
      const { email, name, password } = values;

      const response  = await fetch(registerRoute, {
        method: 'POST',
        headers: {
          // Authorization: `Bearer ${localStorageUserDetails.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        }),
      });

        let data = await response.json();

        if(data.msg){
            toast.error(data.msg,toastOptions);
        }else{

          // localStorage.setItem(
          //   process.env.REACT_APP_TASK_MANAGER_LOCALHOST_KEY,
          //   JSON.stringify(data)
          // );

          toast.error("successfully registered", toastOptions);

          setTimeout(()=>{

            navigate("/login");

          },1000);
         
        }
          
    }
  };


    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const showPassword = () => {

        setPasswordVisible(!isPasswordVisible);
       
    }

    const showConfirmPassword = () => {

        setConfirmPasswordVisible(!isConfirmPasswordVisible);
    }

    return(
    <>

    <div className='registerPage'>

        <div className='registerPageContent'>

        <div className='registerPageImage'>
        <img alt = "Image Place" src = "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGltYWdlfGVufDB8fDB8fHww"></img>
        </div>

        <div className='registerPageForm'>

            <div className='registerPageFormContent'>

            <div className='registerPageFormContentHeader'>Register</div>
          

            <form className='form'>

           
          <div>

          <div className='registerPageFormContentNameContent'>
            <div className='registerPageFormContentName'>
          <input
            type="text"
            id="registerPageFormContentName"
            placeholder='&#xf007;   Name'
            name = "name"
            onChange={(e) => handleChange(e)}
          />
           <VisibilityOutlinedIcon style={{color:"#ffffff", fontSize: 20 }}/>
      
        </div>
       
        <p id = "registerPageFormContentNameError">{nameError}</p>
      
        </div>

            <div className='registerPageFormContentEmailContent'>
            <div className='registerPageFormContentEmail'>
          <input
            type="text"
            id="registerPageFormContentEmail"
            placeholder='&#xf0e0;   Email'
            name = "email"
            onChange={(e) => handleChange(e)}
          />
           <VisibilityOutlinedIcon style={{color:"#ffffff", fontSize: 20 }}/>
      
        </div>
       
        <p id = "registerPageFormContentEmailError">{emailError}</p>
      
        </div>


        <div className='registerPageFormContentPasswordContent'>
        <div className='registerPageFormContentPassword'>
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="registerPageFormContentPassword"
            placeholder='&#xf023;  Password'
            name="password"
            onChange={(e) => handleChange(e)}
          />
     
         {
            isPasswordVisible ? 
            (<VisibilityOutlinedIcon onClick = {showPassword} style={{color:"#828282", fontSize: 20 }}/>)
            
         :
         (<VisibilityOffIcon onClick = {showPassword} style={{color:"#828282", fontSize: 20 }}/>)
         
      
         }

        </div>

        <p id = "registerPageFormContentPasswordError">{passwordError}</p>
      
        </div>

        <div className='registerPageFormContentConfirmPasswordContent'>
        <div className='registerPageFormContentConfirmPassword'>
          <input
            type={isConfirmPasswordVisible ? "text" : "password"}
            id="registerPageFormContentConfirmPassword"
            placeholder='&#xf023;   Confirm Password'
            name = "confirmPassword"
            onChange={(e) => handleChange(e)}
          />
     
     {
        isConfirmPasswordVisible ? 
            (<VisibilityOutlinedIcon onClick = {showConfirmPassword} style={{color:"#828282", fontSize: 20 }}/>)
            
         :
         (<VisibilityOffIcon onClick = {showConfirmPassword} style={{color:"#828282", fontSize: 20 }}/>)
         
      
         }
      
        </div>

        <p id = "registerPageFormContentConfirmPasswordError">{confirmPasswordError}</p>
      
        </div>

        </div>


        <div className='registerPageFormContentButtons'>
        <button type = "button" className="registerPageFormContentRegisterButton" onClick={handleSubmit}>
            Register
          </button>
         
          <p id= "registerPageFormContentHaveNoAccountYet">Have an account ?</p>
          <button type = "button" className="registerPageFormContentLoginButton" onClick={()=>{navigate('/login')}}>
            Log in
          </button>

        </div>

      </form>

            </div>
        </div>

        </div>
    </div>
        
        <ToastContainer/>
    </>

    )
});
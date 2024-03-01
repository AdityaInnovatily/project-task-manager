import React, {useState, useEffect} from 'react';
import "./login.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { loginRoute } from '../APIRoutes';


export const Login = (()=>{

  const navigate = useNavigate();

  const [values, setValues] = useState({ email: "", password: "" });
  const [emailErorr, setEmailError] = useState("");
  const [passwordErorr, setPasswordError] = useState("");
  
  const toastOptions = {
    position: "top-right",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

 
  const handleChange = (event) => {

    setValues({ ...values, [event.target.name]: event.target.value });

  };

  const validateForm = () => {
    const { email, password } = values;
    if (email == "") {
      setEmailError("Email is required");
      return false;
    }
    else if(!email.includes("@") || !email.includes(".com")){
      setEmailError("Email is not correct");
      return false;
    }
    else{
      setEmailError("");
    }
    
    if (password === "") {

      setPasswordError("Password is required");
      // toast.error("Password is required.", toastOptions);
      return false;

    }
    else{
      setPasswordError("");
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { email, password } = values;
     
      console.log("finalSubmit payload",email,password);
      const response  = await fetch(loginRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });


        let data = await response.json();

      if(data.msg){

        toast.error(
          data.msg,
          toastOptions
        );
      }else{
        localStorage.setItem(
          process.env.REACT_APP_TASK_MANAGER_LOCALHOST_KEY,
          JSON.stringify(data)
        );

        toast.success("Welcome To Task Manager", toastOptions);

        setTimeout(()=>{

          navigate("/");

        },1500);
      }
      
    }
  };
   
    const [isPasswordVisible, setPasswordVisible] = useState(false);


    const showPassword = () => {

        setPasswordVisible(!isPasswordVisible);
    }



    return(
    <>

    <div className='loginPage'>

        <div className='loginPageContent'>

        <div className='loginPageImage'>
        <img id = "loginPageImage" src={process.env.PUBLIC_URL + '/registerimage.png'} alt="Example" />
         <p id = "loginPageImageLine1">Welcome aboard my friend</p>
         <p id = "loginPageImageLine2">just a couple of clicks and we start</p>
          </div>

        <div className='loginPageForm'>

            <div className='loginPageFormContent'>

            <div className='loginPageFormContentHeader'>Login</div>
          

            <form className='form'>

           
          <div>

            <div className='loginPageFormContentEmailContent'>
            <div className='loginPageFormContentEmail'>
          <input
            type="email"
            id="loginPageFormContentEmail"
            placeholder='&#xf0e0;   Email'
            name = "email"
            // value={email}
            onChange={(e) => handleChange(e)}
          />
           <VisibilityOutlinedIcon style={{color:"#ffffff", fontSize: 20 }}/>
      
        </div>
       
        <p id = "loginPageFormContentEmailError">{emailErorr}</p>
      
        </div>


        <div className='loginPageFormContentPasswordContent'>
        <div className='loginPageFormContentPassword'>
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="loginPageFormContentPassword"
            placeholder='&#xf023;   Password'
            name = "password"
            // value={password}
            onChange={(e) => handleChange(e)}
          />
     
     {
            isPasswordVisible ? 
            (<VisibilityOutlinedIcon onClick = {showPassword} style={{color:"#828282", fontSize: 20 }}/>)
            
         :
         (<VisibilityOffIcon onClick = {showPassword} style={{color:"#828282", fontSize: 20 }}/>)
         
      
         }
        </div>

        <p id = "loginPageFormContentPasswordError">{passwordErorr}</p>
      
        </div>

        </div>


        <div className='loginPageFormContentButtons'>
          <button type = "button" className="loginPageFormContentLoginButton" onClick={handleSubmit}>
            Log in
          </button>
          <p id= "loginPageFormContentHaveNoAccountYet">Have no account yet?</p>
          <button type = "button" className="loginPageFormContentRegisterButton" onClick={()=>{navigate("/register")}}  >
            Register
          </button>
        </div>

      </form>

            </div>
        </div>

        </div>
    </div>

    <ToastContainer />

    </>

    )
});
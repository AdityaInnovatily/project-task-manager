import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import "./register.css";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';

export const Register = (()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  
    const handleLogin = () => {
      // Handle login logic here
      console.log('Logging in with email:', email, 'and password:', password);
    };
  
    const handleRegister = () => {
      // Handle registration logic here
      console.log('Registering with email:', email, 'and password:', password);
    };

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
           <VisibilityOutlinedIcon style={{color:"#ffffff", fontSize: 20 }}/>
      
        </div>
       
        <p id = "registerPageFormContentNameError">js;fls;fds</p>
      
        </div>

            <div className='registerPageFormContentEmailContent'>
            <div className='registerPageFormContentEmail'>
          <input
            type="text"
            id="registerPageFormContentEmail"
            placeholder='&#xf0e0;   Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
           <VisibilityOutlinedIcon style={{color:"#ffffff", fontSize: 20 }}/>
      
        </div>
       
        <p id = "registerPageFormContentEmailError">js;fls;fds</p>
      
        </div>


        <div className='registerPageFormContentPasswordContent'>
        <div className='registerPageFormContentPassword'>
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="registerPageFormContentPassword"
            placeholder='&#xf023;  Password'
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
            type={isConfirmPasswordVisible ? "text" : "password"}
            id="registerPageFormContentConfirmPassword"
            placeholder='&#xf023;   Confirm Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
     
     {
        isConfirmPasswordVisible ? 
            (<VisibilityOutlinedIcon onClick = {showConfirmPassword} style={{color:"#828282", fontSize: 20 }}/>)
            
         :
         (<VisibilityOffIcon onClick = {showConfirmPassword} style={{color:"#828282", fontSize: 20 }}/>)
         
      
         }
      
        </div>

        <p id = "registerPageFormContentConfirmPasswordError">js;fls;fds</p>
      
        </div>

        </div>


        <div className='registerPageFormContentButtons'>
        <button type = "button" className="registerPageFormContentRegisterButton" onClick={handleRegister}>
            Register
          </button>
         
          <p id= "registerPageFormContentHaveNoAccountYet">Have an account ?</p>
          <button type = "button" className="registerPageFormContentLoginButton" onClick={handleLogin}>
            Log in
          </button>

        </div>

      </form>

            </div>
        </div>

        </div>
    </div>

    </>

    )
});
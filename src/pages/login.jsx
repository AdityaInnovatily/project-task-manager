import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import "./login.css";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const Login = (()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isPasswordVisible, setPasswordVisible] = useState(false);
  
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


    return(
    <>

    <div className='loginPage'>

        <div className='loginPageContent'>

        <div className='loginPageImage'>
        <img alt = "Image Place" src = "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGltYWdlfGVufDB8fDB8fHww"></img>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
           <VisibilityOutlinedIcon style={{color:"#ffffff", fontSize: 20 }}/>
      
        </div>
       
        <p id = "loginPageFormContentEmailError"></p>
      
        </div>


        <div className='loginPageFormContentPasswordContent'>
        <div className='loginPageFormContentPassword'>
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="loginPageFormContentPassword"
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

        <p id = "loginPageFormContentPasswordError"></p>
      
        </div>

        </div>


        <div className='loginPageFormContentButtons'>
          <button type = "button" className="loginPageFormContentLoginButton" onClick={handleLogin}>
            Log in
          </button>
          <p id= "loginPageFormContentHaveNoAccountYet">Have no account yet?</p>
          <button type = "button" className="loginPageFormContentRegisterButton" onClick={handleRegister}>
            Register
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
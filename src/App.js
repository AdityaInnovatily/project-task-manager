import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from './pages/login';
import { Login } from './pages/login';
import { Register } from './pages/register';
import SideBar from './components/sideBar';
import { Analytics } from './pages/analytics';
import { Settings } from './pages/settings';
import Delete from './components/delete';
import { Logout } from './components/logout';
import { CreateTask } from './components/createTask';
import { Card } from './components/card';
import { Board } from './pages/board';
import { PublicPage } from './pages/publicPage';


function App() {
  return (
    <div className="App">
   
   <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Board/>} />
        <Route path="/createTask" element={<CreateTask/>} />
        <Route path="/analytics" element= {<Analytics/>} />
        <Route path="/settings" element= {<Settings/>} />
        <Route path="/publicPage/:taskId" element= {<PublicPage/>} />
  
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;

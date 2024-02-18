import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from './pages/login';
import Trial from './pages/trial';
import { Login } from './pages/login';
import { Register } from './pages/register';
import SideBar from './components/sideBar';
import { Analytics } from './pages/analytics';
import { Settings } from './pages/settings';


function App() {
  return (
    <div className="App">
   
   <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SideBar/>} />
        <Route path="/analytics" element= {<Analytics/>} />
        <Route path="/settings" element= {<Settings/>} />
  
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;

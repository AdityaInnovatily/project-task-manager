import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from './pages/login';
import Trial from './pages/trial';
import { Login } from './pages/login';
import { Register } from './pages/register';
import SideBar from './components/sideBar';


function App() {
  return (
    <div className="App">
   
   <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<SideBar/>} />
     
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;

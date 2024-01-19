
import { BrowserRouter, Routes,Route } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Login from './Pages/Login';
import Dashbord from './Pages/Dashbord';
import Register from './Pages/Register';
import Otp from './Pages/Otp';
import FetchApi from './components/FetchApi';
import Error from './Pages/Error';
import { ToastContainer } from 'react-toastify';




function App() {
  return (
 <>
 <BrowserRouter>
 <div className="App">
 <Navbar/>
 <ToastContainer/>
 
 

 
<Routes>
  <Route path="/" element={< Login/>} />
  
  <Route path="/Blog" element={<Blog />} />
  <Route path="/Contact" element={<Contact />} />
  <Route path="/Dashbord" element={<Dashbord />} />
  <Route path="/CRUD" element={<FetchApi />} />
  <Route path="/user/OTP" element={<Otp />} />
  <Route path="/register" element={<Register />} />
  <Route path="*" element={< Error/>} />


  
  
  
</Routes>



 </div>
 </BrowserRouter>

 </>
  );
}

export default App;

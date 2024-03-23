import React from 'react';
import Contact from './component/contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './component/Register';
import Profile from './component/Profile';
import Home from './component/Home';
import { Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Home />
      <Routes>
        <Route path='/' element={<Contact />} />
        <Route path='/Register' element={<Register />} />
        <Route path="/Profile" element={<Profile />} /> 
      </Routes>
    </>
  );
}

export default App;

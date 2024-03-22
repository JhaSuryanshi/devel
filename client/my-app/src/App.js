import React from 'react';
import Contact from './component/contact';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './component/Register';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Contact />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

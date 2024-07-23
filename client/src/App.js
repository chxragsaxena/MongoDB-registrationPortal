import React from "react";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Login from "./Pages/Login";
import Register from "./Pages/Register"
import Secret from "./Pages/Secret"
export default function App(){
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Register/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/secret" element={<Secret/>}/>
      </Routes>
    </Router>
  );
}

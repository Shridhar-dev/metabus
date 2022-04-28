import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import AddBus from './pages/AddBus';
import BusMap from './pages/BusMap';
import BusRoute from './pages/BusRoute';
import Home from './pages/Home';
import Tracking from './pages/Tracking';



export default function App() {
  const [menu, setMenu] = useState(false);
  return (
    <Router>    
      <nav className='flex items-center justify-between w-full p-5'>
            <div>
              <Link to="/">metabus</Link>
            </div>
            <div className='hidden sm:flex'>
              <Link to="/getmap" className='mx-5'>Map</Link>
              <Link to="/addbus" className='mx-5'>Add your bus</Link>
              <Link to="/tracking" className='mx-5'>Start Tracking</Link>
            </div>
            <div className={`sm:hidden ${menu?'flex':'hidden'} flex-col items-center justify-center z-[800] fixed top-16 w-full left-0 bg-white`}>
              <Link to="/getmap" className='mx-5'>Map</Link>
              <Link to="/addbus" className='mx-5'>Add your bus</Link>
              <Link to="/tracking" className='mx-5 pb-5'>Start Tracking</Link>
            </div>
            <button className='sm:hidden visible' onClick={()=>{setMenu(!menu)}}>=</button>
          </nav>
        <Routes>
          
          <Route exact path="/" element={<Home />} />
          <Route exact path="/getmap" element={<BusMap />} /> 
          <Route exact path="/addbus" element={<AddBus />} /> 
          <Route exact path="/tracking" element={<Tracking/>} /> 
          <Route exact path="/busroute/:id" element={<BusRoute/>} /> 
        </Routes>   
    </Router>
  );
}
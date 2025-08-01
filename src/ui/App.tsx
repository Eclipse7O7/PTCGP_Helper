import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

// Browser router doesn't work with builds, but Hashrouter seems to require a build every single change to work. 
//   Now browser router doesn't seem to also work with dev builds *crying*
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
//import { HashRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

import InventoryPage from './InventoryPage';
import StartPage from './StartPage';
import TestPage from './TestPage';



function App() {
  

  useEffect(() => {
    window.electron.resource_update((stats) => {
      console.log(stats);
    });
  }, []);
  

  return (
    <Router>
      { <nav className="testNav">
        <Link to="/">Start Page</Link>
        <Link to="/test">Test Page</Link>
        <Link to="/inventory">Inventory Page</Link>
      </nav> }
       <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/test" element={<TestPage />} />
       </Routes>
    </Router>
   
  )


}
export default App

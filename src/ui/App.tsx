import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import InventoryPage from './InventoryPage';
import StartPage from './StartPage';
import TestPage from './TestPage';




function App() {
  


  useEffect(() => {
    window.electron.resource_update((stats) => {
      console.log(stats);
    });
  }, []);
  

  // This Routing doesn't work in the build version, but works in dev
  // *crying face* - debug why and see if its as the base path is different in the build version

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

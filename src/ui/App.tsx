import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import InventoryPage from './InventoryPage';
import TestPage from './testPage';
import StartPage from './StartPage';
//import TestPage from './TestPage';



function App() {
  



  useEffect(() => {
    window.electron.resource_update((stats) => {
      console.log(stats);
    });
  }, []);
  

  return (
    <Router>
      <nav className="testNav">
        <Link to="/">Start Page</Link>
        <Link to="/test">Test Page</Link>
        <Link to="/inventory">Inventory Page</Link>
      </nav>
       <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/test" element={<TestPage />} />
       </Routes>
    </Router>
   
  )


  /*
  return (
    <>
      <div>
        Test for GitHub

        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )

*/

}
export default App

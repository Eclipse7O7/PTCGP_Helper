import './start.css'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

import PTCGPLogo from './assets/PTCGP_logo.png';

export default function StartPage() {
   const navigate = useNavigate();

   function openInventory() {
      const logo = document.querySelector(".logo");
      if (!logo) {
         console.error("Logo element not found");
         return;
      }
      logo.classList.add("spin-expand");
      setTimeout(() => {
         logo.classList.remove("spin-expand");
         navigate("/inventory");
      }, 1400);
   }


   return (
      <div>
         <button className="startButton" onClick={openInventory}> <img src={PTCGPLogo} className="logo" alt="PTCGP Helper logo"/></button>
         <h1>PTCGP Helper</h1>
      </div>
   );
}
import React from "react";

import logo from "../images/logo.png";
import "../css/navbar.css";

export default function Navbar() {
   return (
      <header className="nav-bar">
         <img className="logo" alt="Passit-logo" src={logo} />
         <nav className="nav-left">
            <ul className="nav--links">
               <li>
                  <a href="http://localhost:3001/">Home</a>
               </li>
               <li>
                  <a href="http://localhost:3001/about">About</a>
               </li>
               <li>
                  <a href="http://localhost:3001/about">Contact</a>
               </li>
            </ul>
         </nav>
         <nav className="nav-right">
            <ul className="nav--links">
               <li>
                  <a href="http://localhost:3001/about">Login</a>
               </li>
            </ul>
            <button>Sign Up</button>
         </nav>
      </header>
   );
}

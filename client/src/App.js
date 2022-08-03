import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";

import Todo from "./components/Todo";
import Navbar from "./components/Navbar";
import About from "./components/About";

function App() {
   return (
      <BrowserRouter>
         <div className="App">
            <Navbar />
         </div>
         <Routes>
            <Route path="/" exact element={<Todo />} />
            <Route path="/about" exact element={<About />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;

import React, {  } from 'react';
import './App.css';
import Header from "./components/Header";
import Routes from "./Routes"; // "/", "/search", ... 



// // TESTING 
// const API_KEY = "1584051e241f7b281373448a78937e84";


function App() {
  
  return (
    <div className="App">

      <Header></Header> 

      <Routes></Routes>
      
    </div>
  );
}

export default App;

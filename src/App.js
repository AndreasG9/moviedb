import React, {  } from 'react';
import './App.css';
//import Header from "./components/Header";
import Routes from "./Routes"; // "/", "/search", ... 
//import Footer from './components/Footer';



// // TESTING 
// const API_KEY = "1584051e241f7b281373448a78937e84";


function App() {
  
  return (
    <div>
      {/* <Header></Header>  */}
      <Routes className="App"></Routes>
      {/* <Footer></Footer> */}
    </div>
  );
}


export default App;

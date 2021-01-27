import React from "react"; 
import Header from "../components/Header";
//import Footer from "../components/Footer"; 
import Films from "../components/Films/Films.js";


function FilmsPage() {
  // /films/genre or decade or .... / sorting method 

  return (
    <div>
      <Header></Header>
      <Films ></Films>
    </div>
  )
}

export default FilmsPage; 

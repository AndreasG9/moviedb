import React from "react"; 
import Header from "../components/Header";
//import Footer from "../components/Footer"; 
import Films from "../components/Films/Films.js";


function FilmsPage( {browseby, selected} ) {
  // /films/genre or decade or .... / sorting method 

  return (
    <div>
      <Header></Header>
      <Films browseby={browseby} selected={selected}></Films>
      {/* <Footer></Footer> */}
    </div>
  )
}

export default FilmsPage; 

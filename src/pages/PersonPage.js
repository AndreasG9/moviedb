import React from "react"; 
import Header from "../components/Header";
import Person from "../components/Person/Person.js"; 

 function PersonPage( {credit}) {


  return (
    <div>
      <Header></Header>
      <Person credit={credit}></Person>
      
    </div>
  )
}

export default PersonPage; 




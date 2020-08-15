import React from "react";
import Header from "../components/Header";
import BrowseBy from "../components/BrowseBy"; 
import PopularThisWeek from "../components/PopularThisWeek/PopularThisWeek"; 


 function Home() {
  // Home Page


  return (
    <div>
      <Header></Header>
      <BrowseBy></BrowseBy>
      <PopularThisWeek></PopularThisWeek>
    </div>
  )
}


export default Home; 
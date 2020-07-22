import React from "react";
import Header from "../components/Header";
//import Footer from "../components/Footer"; 
import BrowseBy from "../components/BrowseBy"; 
import PopularThisWeek from "../components/PopularThisWeek/PopularThisWeek"; 


 function Home() {
  // Home Page
  // Header w/ SEARCH (search box )
  // Browse by: Popular(...) GENRE (...) YEAR(...)
  // PopularThisWeek pagination (3 films a "page", max 12 results)  

  return (
    <div >
      
      <Header></Header> {/* Navigation and Search*/}
      <BrowseBy></BrowseBy>
      <PopularThisWeek></PopularThisWeek>
      {/* <Footer></Footer> */}
      
    </div>
  )
}




export default Home; 

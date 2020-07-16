import React from "react";
import BrowseBy from "../components/BrowseBy"; 
import Search from "../components/Search"; 


 function Home() {
  // Home Page (FILMS)
  // Browse by: Popular(...) GENTRE (...) YEAR(...)   SEARCH (search box)
  // Default: Popular This Week 

  return (
    <div>

      <Search></Search>
      <BrowseBy></BrowseBy>

      
    </div>
  )
}

export default Home; 

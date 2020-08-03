import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"; 
import BrowseBy from "../components/BrowseBy"; 
import PopularThisWeek from "../components/PopularThisWeek/PopularThisWeek"; 
import { UserProvider } from "../context/UserContext.js";


 function Home() {
  // Home Page
  // Header w/ SEARCH (search box )
  // Browse by: YEAR(...) RATING(...) GENRE (...) SORTING (...)
  // PopularThisWeek pagination (3 films a "page", max 12 results)  
  // userprovider has context of login status 

  // TODO more sorting method based on user film ratings 

  return (
    <div>
      <UserProvider>
        <Header></Header>
      </UserProvider>
      <BrowseBy></BrowseBy>
      <PopularThisWeek></PopularThisWeek>
      <Footer></Footer>
    </div>
  )
}




export default Home; 

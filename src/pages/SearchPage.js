import React from "react"; 
import Search from "../components/Search/Search"; 
import Header from "../components/Header";

function SearchPage( {query} ) {

  return (
    <div>
      <Header></Header>
      <Search query={query}></Search>
    </div>
  )
}

export default SearchPage; 
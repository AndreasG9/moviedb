import React from "react"; 
import { withRouter } from "react-router-dom";
import SearchRes from "../components/SearchRes"; 

function SearchResults( {results, query} ) {
  // load SearchRes component, narrow search nav component 


  return (
    <div>
      <SearchRes results={results} query={query}></SearchRes>
    </div>
  )
}

export default withRouter(SearchResults); 

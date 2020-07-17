import React from "react"; 
import { withRouter } from "react-router-dom";
import Results from "../components/Results"; 
import Header from "../components/Header";

function SearchResults( {results, query} ) {
  // load SearchRes component, narrow search nav component 


  return (
    <div>
      <Header></Header>
      <Results results={results} query={query}></Results>
    </div>
  )
}

export default withRouter(SearchResults); 

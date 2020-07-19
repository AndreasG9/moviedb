import React from "react"; 
import { withRouter } from "react-router-dom";
import Results from "../components/Search/Results"; 
import Header from "../components/Header";
import Footer from "../components/Footer";

function SearchResults( {results, query} ) {
  // load SearchRes component, narrow search nav component 


  return (
    <div>
      <Header></Header>
      <Results results={results} query={query}></Results>
      <Footer></Footer>
    </div>
  )
}

export default withRouter(SearchResults); 

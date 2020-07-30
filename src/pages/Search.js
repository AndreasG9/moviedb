import React from "react"; 
import { withRouter } from "react-router-dom";
import SearchResults from "../components/Search/SearchResults"; 
import Header from "../components/Header";

function Search( {results, query} ) {
  // load SearchRes component, narrow search nav component 


  return (
    <div>
      <Header></Header>
      <SearchResults 
        results={results}
        query={query}
        // posts_per_page={posts_per_page}
        // total_pages={total_pages}
        >
      </SearchResults>
    </div>
  )
}

export default withRouter(Search); 

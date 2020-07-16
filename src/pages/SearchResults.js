import React from "react"; 
import { withRouter } from "react-router-dom";
import SearchRes from "../components/SearchRes"; 

function SearchResults( {props} ) {
  // load SearchRes component, narrow search nav component 

  // const state = props.location.results; 
   console.log(props); 

  return (
    <div>
      {/* <SearchRes></SearchRes> */}
    </div>
  )
}

export default withRouter(SearchResults); 

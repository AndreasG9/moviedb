import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";


function Search( props ) {

  const API_KEY = "1584051e241f7b281373448a78937e84";

  // State 
  // TODO store single obj, ONLY query submit search 
  const [search, set_search] = useState("");
  const [query, set_query] = useState("");
  const [results, set_results] = useState([]); 

  // const [query, set_query] = useState({
  //   search: "",
  //   results = []
  // })

  // Effect 
  useEffect(() => {
    // only runs when form submitted (search)
    // new results each search 
    if(query !== "") get_films(); // FIX 
  }, [query]); 

  const update_search = (event) => {
    // onChange with input, REMOVE LATER 
    set_search(event.target.value); 
  }

  const get_search = (event) => {
    // search form submission 
    event.preventDefault();
    set_query(search); 
    set_search(""); // reset  
  }

  const get_films = async () => {
    // grab the data from GET /search/movie 
    // query string is value of query state string 

    const search_movie = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`; // GET /search/movie 

    const res = await fetch(search_movie);
    const data = await res.json(); 

    // // filter, if a result has under 50 votes I dont want to display it 
    // const filtered = data.filter( (result) => {

    // })

    set_results(data.results); 

    console.log(data.results);



    props.history.push("/search", {results: data.results, query:query}); // redirect to "/search", which loads the SearchResults component, pass props 
  }

  const get_multiple = async () => {
    // grab data from GET /search/multi


  }



  return (
    
    <div>
      <form onSubmit={get_search}>
        <div style={container_style}>
          <input 
            style={search_bar_style}
            className="focus" 
            type="text" 
            onChange={update_search}>
          </input>
          <button 
            style={search_button_style} 
            className="hover focus active" 
            type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          </button>
        </div>
      </form>   
    </div>

  ); 
}


// Style 
const  container_style = {
  marginTop: "1%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  left: "15%",
}

const search_bar_style = {
  fontFamily: "Roboto",
  backgroundColor: "#2b3440",
  // borderRadius: "50em", 
  borderRadius: "2%",
  border: "none",
  padding: "10px",
  // width: "100%"
}

const search_button_style = {
  position: "absolute",
  right: "0%",
  border: "none",
  backgroundColor: "#e1e3e5",
  // marginTop: "3px",
  height: "100%"
}


export default withRouter(Search); 

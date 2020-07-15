import React, { useState, useEffect } from 'react';
import './App.css';
import Header from "./components/Header";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";
import Film from "./components/Film";

// TESTING 
const API_KEY = "1584051e241f7b281373448a78937e84";
//const example = `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`; 


function App() {
  
  // State 
  // TODO store single obj 
  const [search, set_search] = useState("");
  const [query, set_query] = useState("");
  const [results, set_results] = useState([]); 

  // vars  
  const search_movie = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`; // GET /search/movie 

  // Effect 
  useEffect(() => {
    // only runs when form submitted (search)
    // new results each search 
    if(query !== "") get_films(); // FIX 
  }, [query]); 


  const update_search = (event) => {
    // onChange with input 
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

    const res = await fetch(search_movie);
    const data = await res.json(); 
    set_results(data.results); 

    console.log(data.results);
  }

  // TODO: IMPROVE LAYOUT, VARIABILITY 

  return (
    <div className="App">

      <Header></Header>
      <Search update_search={update_search} get_search={get_search}></Search>
      <SearchResults query={query} results={results}></SearchResults>
      
    </div>
  );
}

export default App;

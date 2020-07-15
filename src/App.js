import React, { useState, useEffect } from 'react';
import './App.css';
import Header from "./components/Header";
import Search from "./components/Search";

// TESTING 
const API_KEY = "1584051e241f7b281373448a78937e84";
const example = `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`; 


function App() {

  // State 
  const [search, set_search] = useState("");
  const [query, set_query] = useState(" "); // actual search 

  useEffect( () => {
    search_films(); 
  }, [query]); // new results each search 


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


  const search_films = async () => {
    // grab the data from GET /search/movie 
    // query string is value of query state string 

    const search_movie = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;

    const res = await fetch(search_movie);
    const data = await res.json(); 
    console.log(data); 

  }

  return (
    <div className="App">

      <Header></Header>
      <Search update_search={update_search} get_search={get_search}></Search>
      
    </div>
  );
}

export default App;

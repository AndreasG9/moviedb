import React, { useState, useEffect } from "react";
import axios from 'axios'; 
import SearchResults from "./SearchResults"; 
import PaginantionNumbers from "./PaginationNumbers"; 

function Search( {query} ) {

  // State 
  const [results, set_results] = useState([]);

  const [current_page, set_current_page] = useState(1);

  const [pages, set_pages] = useState({
    posts_per_page: 20,
    total_pages: 1
  })


  useEffect( () => {
    // grab the data from GET /search/movie 
    // PAGINATION MAX 10 PAGES for search result 
    document.querySelector('body').scrollTo(0,0); // select new page, make sure start at the top 

    const get_search = async () => {

      // multi-search (include movies and people, exclude the rest);
      const search_multi = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=${current_page}&include_adult=false`;
      //const search_movie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=${current_page}&include_adult=false`; // GET /search/movie 
      const data = await axios.get(search_multi); 

      // exclude media type: tv , only want movie and person results 
      const filtered = data.data.results.filter( (result) => result.media_type === "movie" || result.known_for_department !== undefined);
      set_results(filtered); 
      
      set_pages({
        posts_per_page: data.data.results.length,
        total_pages: data.data.total_pages
      })

      //console.log(data.data.total_pages); 

      //const total_pages = data.data.results

      // filter ??  
      // 
    //filter out low count films 
    //const filtered_results = results.filter( (result) => result.vote_count > 3);
    }

    get_search(); 

  }, [query, current_page]); 

  const page_limit = 10; 
  const total = pages.total_pages > 10 ? page_limit*pages.posts_per_page : pages.total_pages*pages.posts_per_page;

  const next = () => {
    set_current_page(current_page + 1);

    // if(current_page === total){

    // }

  }
  const prev = () => {
    set_current_page(current_page - 1);

  }

  const go_to_page = (page_num) => set_current_page(page_num); 


  return (
    <div>
      <SearchResults query={query} results={results} total={total}></SearchResults>
      <PaginantionNumbers posts_per_page={pages.posts_per_page} total_pages={pages.total_pages} prev={prev} next={next} go_to_page={go_to_page}></PaginantionNumbers>
    </div> 
  ); 
}

export default Search; 

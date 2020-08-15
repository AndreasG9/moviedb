import React, { useState, useEffect } from "react";
import axios from 'axios'; 
import SearchResults from "./SearchResults"; 
import PaginantionNumbers from "./PaginationNumbers"; 
import { useLocation, useHistory } from "react-router-dom"; 

function Search( {query} ) {

  const location = useLocation();
  const history = useHistory();  

  if(query === undefined){
    // user manually entered a path, (in our format the-movie-title, otherwise just send 404)

    const q = location.pathname.split("/")[2]; 
    if(q === undefined) query = " "; 
    else if(q.length === 0) query = " ";   
    else query = q.replace(/\+/g, " "); // "search+result" to "search result" for query  
  }
 

  // State 
  const [results, set_results] = useState([]);
  const [current_page, set_current_page] = useState(1);
  const [pages, set_pages] = useState({
    posts_per_page: 20,
    total_pages: ""
  });


  useEffect( () => {
    // grab the data from GET /search/movie 
    // PAGINATION MAX 10 PAGES for search result 
    document.querySelector('body').scrollTo(0,0); // select new page, make sure start at the top 

    const get_search = async () => {

      // multi-search (include movies and people, exclude the rest);
      const search_multi = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=${current_page}&include_adult=false`;
      const data = await axios.get(search_multi).catch(error => console.log(error)); 

      // exclude media type: tv , only want movie and person results 
      const filtered = data.data.results.filter( (result) => result.media_type === "movie" || result.known_for_department !== undefined);
      set_results(filtered); 
      
      set_pages({
        posts_per_page: data.data.results.length,
        total_pages: data.data.total_pages
      })

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
      <div>
        <SearchResults query={query} results={results} total={total}></SearchResults>
        <PaginantionNumbers posts_per_page={pages.posts_per_page} total_pages={pages.total_pages} prev={prev} next={next} go_to_page={go_to_page}></PaginantionNumbers>
      </div>
    </div> 
  ); 
}

export default Search; 
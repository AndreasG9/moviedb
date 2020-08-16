import React, { useState, useEffect } from "react";
import axios from 'axios'; 
import SearchResults from "./SearchResults"; 
import ReactPaginate from "react-paginate";
import { useLocation, useHistory } from "react-router-dom"; 

function Search( {query} ) {

  const location = useLocation();
  const history = useHistory();  

  if(query === undefined){
    // user manually entered a path, (in our format the-movie-title, otherwise just send 404)

    if(location.pathname.split("/").length > 3) history.push("/404"); // incorrect  path format 

    const q = location.pathname.split("/")[2]; 
    if(q === undefined) query = " "; 
    else if(q.length === 0) query = " ";   
    else query = q.replace(/\+/g, " "); // "search+result" to "search result" for query  
  }
 

  // State 
  const [results, set_results] = useState([]);
  const [current_page, set_current_page] = useState(1);
  const [total_pages, set_total_pages] = useState("");


  useEffect( () => {
    // grab the data from GET /search/movie 
    // PAGINATION MAX 10 PAGES for search result 
    document.querySelector('body').scrollTo(0,0); // select new page, make sure start at the top 

    const get_search = async () => {
    
      // multi-search (include movies and people, exclude the rest); // a page has 20 results 
      const search_multi = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=${current_page}&include_adult=false`;
      const data = await axios.get(search_multi).catch(error => console.log(error)); 


      // exclude media type: tv , only want movie and person results, and vote count must be greater than 4
      let filtered = data.data.results.filter( (result) => result.media_type === "movie" || result.known_for_department !== undefined);
      filtered = filtered.filter( (result) => result.vote_count > 4 || result.known_for_department !== undefined); 
      set_results(filtered); 

      const temp = data.data.total_pages > 10 ? 10 : data.data.total_pages; // MAX 10 total pages 
      set_total_pages(temp); 
    }

    get_search(); 

  }, [query, current_page]); 


  // const next = () => set_current_page(current_page + 1);
  // const prev = () => set_current_page(current_page - 1);
  const go_to_page = (page_num) => {
   set_current_page(page_num.selected+1); 
  }

  return (
    <div>
      <div>
        <SearchResults query={query} results={results}></SearchResults>
        <ReactPaginate
          nextClassName = "prev-next"
          nextLinkClassName = "prev-next-link"
          previousClassName = "prev-next"
          previousLinkClassName = "prev-next-link"
          activeLinkClassName = "active-page"
          breakClassName= "break"
          containerClassName = "paginate-container"
          pageClassName = "page"
          pageLinkClassName = "page-link"
          
          pageCount = {parseInt(total_pages)}
          pageRangeDisplayed = {2}
          marginPagesDisplayed = {2}
          onPageChange = {go_to_page}>
        </ReactPaginate>  
      </div>
    </div> 
  ); 
}

export default Search; 
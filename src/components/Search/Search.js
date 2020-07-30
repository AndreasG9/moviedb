import React, { useState, useEffect } from "react";
import styled from "styled-components"; 
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
      const search_movie = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=${current_page}&include_adult=false`; // GET /search/movie 
      const data = await axios.get(search_movie); 
      set_results(data.data.results);  

      
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

      {/* <Nav className="media-width-50">
      <Button active={active.left}>Previous</Button>
       <UList>
        {page_numbers.map( (num) => (
          <Item key={num}>
            <A href= "!#" >{num}</A>
          </Item>
        ))}
      </UList> 
      <Button active={active.right}>Next</Button>
    </Nav> */}
    </div> 
  ); 
}

// Style 
const Nav = styled.nav`
  border-top: 1px solid #a5a5a5; 
  display: flex;
  flex-direction: row; 
  align-items: center;
  justify-content: space-between; 
  padding: 5% 0; 
`;


const Button = styled.button`
  //margin-top: 5px; 
  width: 18%; 
  height: 5%; 
  padding: 10px; 
  background-color: #273038; 
  text-align: center; 
  border: none; 
  border-radius: 5%; 
  color: #a5a5a5;

  &:hover{
    cursor: pointer;  
    opacity: .3; 
    color: #e1e3e5;
  }

  transform: ${props => props.active ? "scale(1)": "scale(0)"}; 
`;


const UList = styled.ul`
  list-style: none; 
  display: flex;
  flex-direction: row; 
  justify-content: center; 

  padding: 0; 
  margin: 0 2% 0 2%; 
`;

const Item = styled.li`
  padding: 6px; 

  &:hover{
    background-color: #273038 
  }
`;

const A = styled.a`
  color: #a5a5a5;
`;



export default Search; 

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import PopularThisWeekResults from "./PopularThisWeekResults";

 function PopularThisWeek() {
  // display poster, tooltip the title and year, and store movie id if the user selects that film for further info 
  // Pagination w/ arrows to traverse the 18 trending films this week 

  // State 
  const [results, setResults] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [active, setActive] = useState({
    // disable pagination arrow if no more results 
    left: false,
    right: true
  }); 

  const posts_per_page = 3; 


  // Effect 
  useEffect(() => {
    // only called once, not much data (20 results)

    const get_this_week = async () => {
      // grab the data from GET /trending/{media_type}/{time_window} 
      
      const this_week = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`;
      //const this_week = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`; // popular updated daily 
      const res = await axios.get(this_week);
      setResults(res.data.results); 
    }; 

    get_this_week(); 
  }, []); 


  // Pagination (kind of)
  // for homepage only have 20 results (3 per page), 0-3, 3-6, ...  (1 empty)
  // Only have left and right arrow to nav 
  const index_last = currentPage * posts_per_page; 
  const index_first = index_last - posts_per_page;
  const current = results.slice(index_first, index_last); 


  // Funcs 
  const next = () => {
    setCurrentPage(currentPage + 1); 

    if(currentPage === 6){
      // disable pointer event, change opacity 
      setActive({left: true, right: false}); 
    }

    else{
      // gets called multiple times but its fine 
      setActive({left: true,right: true})
    }

  }


  const prev = () => {
    setCurrentPage(currentPage - 1); 

    if(currentPage === 2){
      setActive({left: false, right: true}); 
    }

    else setActive({left: true, right: true}); 
  }


  return (
    <Container>

      <Header>
        <Span>POPULAR FILMS THIS WEEK</Span>
        <SpanMore>MORE</SpanMore>
      </Header>

      <LeftArrow onClick={prev} active={active.left}>{"<"}</LeftArrow>
      <PopularThisWeekResults results={current}></PopularThisWeekResults>
      <RightArrow onClick={next} active={active.right}>{">"}</RightArrow>

    </Container>
  )
}


// Style 
const Container = styled.div`
  position: relative;
  left: 24%; 
  margin-top: 40px; 
  width: 800px;
  height: 500px; 

  -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

const Header = styled.h2`
  font-size: 1.1rem; 
  color: #6f797d;
  padding: 5px; 
  border-bottom: 1px solid #6f797d; 
  font-style: bold;
  width: 93%; 
  margin-left: 1%; 
`;

const Span = styled.span`
  &:hover{
    cursor: pointer; 
    color: #adadff; 
  }
`;

const SpanMore = styled.span`
font-size: .8rem; 
  position: relative; 
  left: 62%; 

  &:hover{
    cursor: pointer; 
    color: #adadff; 
  }
`;

const LeftArrow = styled.span`
  position: absolute; 
  top: 40%;
  right: 100%;  
  color: #6f797d; 

  font-size: 2.5em; 
  padding: 8px; 
  font-weight: bold; 

  &:hover{
    cursor: pointer; 
    color: #e1e3e5;
  }

  opacity: ${props => props.active ? "1" : ".2"}; 
  pointer-events: ${props => props.active ? "auto" : "none"}; 
`;

const RightArrow = styled.span`
  position: absolute; 
  top: 40%;
  left: 96%;  

  color: #6f797d; 
  font-size: 2.5em; 
  padding: 8px; 
  font-weight: bold; 

  &:hover{
    cursor: pointer; 
    color: #e1e3e5; 
  }

  opacity: ${props => props.active ? "1" : ".2"}; 
  pointer-events: ${props => props.active ? "auto" : "none"}; 

`;

export default PopularThisWeek; 


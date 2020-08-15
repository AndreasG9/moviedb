import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import PopularThisWeekResults from "./PopularThisWeekResults";

 function PopularThisWeek() {
  // display poster, tooltip the title and year, and store movie id if the user selects that film for further info 
  // Pagination w/ arrows to traverse the 20 trending films this week 

  // State 
  const [results, setResults] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 

  const [active, setActive] = useState({
    // disable pagination arrow if no more results 
    left: false,
    right: true
  }); 

  const posts_per_page = 4; 


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
  // for homepage only have 20 results (4 per page), 0-4, 4-8, ... 
  // Only have left and right arrow to nav 
  const index_last = currentPage * posts_per_page; 
  const index_first = index_last - posts_per_page;
  const current = results.slice(index_first, index_last); 

  // Funcs 
  const next = () => {
    setCurrentPage(currentPage + 1); 

    if(currentPage === 4) setActive({left: true, right: false}); // disable pointer event, change opacity 
    else  setActive({left: true,right: true}) // gets called multiple times but its fine 
  }

  const prev = () => {
    setCurrentPage(currentPage - 1); 

    if(currentPage === 2)setActive({left: false, right: true});
    else setActive({left: true, right: true}); 
  }


  return (
    <Container>

      <Header>
        <Span>POPULAR FILMS THIS WEEK</Span>
        <SpanMore>MORE</SpanMore>
      </Header>

      <BrowseContainer>
        <Arrow onClick={prev} active={active.left}>{"<"}</Arrow>
        <PopularThisWeekResults results={current}></PopularThisWeekResults>
        <Arrow onClick={next} active={active.right}>{">"}</Arrow>
      </BrowseContainer>

    </Container>
  )
}


// Style 
const Container = styled.div`
  margin-top: 2%; 
  font-family: Roboto; 
  
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  width: 54%; 
  margin-left: 24%; 
 
 @media only screen and (max-width: 1500px) {
    width: 90%; 
    margin-left: 5%;  
 }

`;

const Header = styled.div`
  font-size: 1.0rem; 
  color: #6f797d;
  padding-bottom: 4px; 
  border-bottom: 1px solid #6f797d; 
  width: 92%;
  margin: 5% 0 1% 0; 
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
  left: 74.9%; 

  &:hover{
    cursor: pointer; 
    color: #adadff; 
  }
`;

const BrowseContainer = styled.div`
  display: flex; 
  flex-direction: row; 
  align-items: center; 

  position: relative;
  right: 4%; 
`;

const Arrow = styled.span`
  color: #6f797d; 

  font-size: 2.5em; 
  font-weight: bold; 
  padding: 0 5px; 
  margin-bottom: 4%; 


  &:hover{
    cursor: pointer; 
    color: #e1e3e5;
  }

  opacity: ${props => props.active ? "1" : ".2"}; 
  pointer-events: ${props => props.active ? "auto" : "none"}; 
`;

export default PopularThisWeek; 
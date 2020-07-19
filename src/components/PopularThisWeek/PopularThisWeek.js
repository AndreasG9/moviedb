import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

 function PopularThisWeek() {
  // display poster, tooltip the title and year, and store movie id if the user selects that film for further info 

  // TEST data 
  const poster = "https://image.tmdb.org/t/p/w400/qJ2tW6WMUDux911r6m7haRef0WH.jpg"; 
  //const poster = "https://image.tmdb.org/t/p/w400/qrMwzei3TnraRrz1DD89DqGwHxc.jpg"; 
  const title = "The Dark Knight";
  const year = 2008; 

  const [results, setResults] = useState([]); 
  const [postsPage, setPostsPage] = useState(3); // 3 posts a "page"

  // Effect 
  useEffect(() => {
    // only called once

    const get_this_week = async () => {
      // grab the data from GET /trending/{media_type}/{time_window} 
      
      const this_week = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`;
  
      const res = await axios.get(this_week);
      setResults(res.data.results); 
    }

    get_this_week();
  }, []); 



  return (
    <Container>
      <Header>
        <Span>POPULAR FILMS THIS WEEK</Span>
        <SpanMore>MORE</SpanMore>
      </Header>

      <LeftArrow>{"<"}</LeftArrow>

      <FilmsContainer>

        <Film>
          <ToolTip className="test">{title + "  (" + year + ")"}</ToolTip>
          <Poster src={poster} alt="Poster"></Poster>
        </Film>

        <Film>
          <ToolTip className="test">{title + "  (" + year + ")"}</ToolTip>

        </Film>

        {/* <Film>
          <Poster src={poster} alt="Poster"></Poster>
        </Film>

        <Film>
          <Poster src={poster} alt="Poster"></Poster>
        </Film> */}
      </FilmsContainer>

      <RightArrow>{">"}</RightArrow>


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
`;

const Header = styled.h2`
  font-size: 1.1rem; 
  color: #6f797d;
  padding: 5px; 
  border-bottom: 1px solid #6f797d; 
  font-style: bold;
  width: 90%; 
  margin-left: 2%; 
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
  left: 60%; 

  &:hover{
    cursor: pointer; 
    color: #adadff; 
  }
`;

const FilmsContainer = styled.div`
  height: 85%;
  display: flex; 
  flex-direction: row; 
`;


const ToolTip = styled.span`
  // trying this, ugly lookin  

  position: absolute; 
  left: 6%;
  bottom: 90%;  
  min-width: 180px; 
  min-height: 20px; 
  text-align: center; 
   
  background-color: #425566; 
  font-size: 1.0em; 
  border-radius: 20px; 
  padding: 8px 0; 
  color: #e1e3e5;
  font-style: italic; 

  transform: scale(0);
  
  &:after{
    content: " ";
    position: absolute;
    top: 100%;
    left: 50%;
    
    margin-left: -8px;
    border-width: 8px;
    border-style: solid;
    border-color: #425566 transparent transparent transparent;
  }
`;

const Film = styled.div`
  margin: 5px; 
  border: 2px solid green; 

  &:hover .test{
    transition-delay: .4s;
    transform: scale(1);
  }
`;


// FIX HOVER WHEN CONTEXT ADDED 
const Poster = styled.img`
  width: 236px; 
  height: 351px;
  border: 1px solid #a5a5a5;
  border-radius: 2%; 
  margin: 10px; 

  &:hover{
    cursor: pointer;
    border: 2px solid #98fb98;
    margin: 9px; 
  }
`;

// FIX FIX 
const LeftArrow = styled.span`
  position: absolute; 
  top: 40%;
  right: 100%;  

  color: #6f797d; 
  font-size: 2.0em; 
  padding: 8px; 
  font-weight: bold; 

  &:hover{
    cursor: pointer; 

    color: #e1e3e5; // TODO IF NEXT 
  }
`;

const RightArrow = styled.span`
  position: absolute; 
  top: 40%;
  left: 95%;  

  color: #6f797d; 
  font-size: 2.0em; 
  padding: 8px; 
  font-weight: bold; 
  
  &:hover{
    cursor: pointer; 

    color: #e1e3e5; // TODO IF NEXT 
  }
`;






export default PopularThisWeek; 


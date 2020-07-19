import React from "react";
import styled from "styled-components"; 

 function PopularThisWeek() {
  // TESTING option in BrowseBy 

  // more link to popular/this/week/
  const this_week = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`;
  
  // have 12 films, display 3 at a time with left and right arrows 



  // TEST data 
  // .poster_path; 
  //const poster = "https://image.tmdb.org/t/p/w400/qJ2tW6WMUDux911r6m7haRef0WH.jpg"; 
  const poster = "https://image.tmdb.org/t/p/w400/qrMwzei3TnraRrz1DD89DqGwHxc.jpg"; 


  const poster2 = "https://image.tmdb.org/t/p/w400/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg"; 


  return (
    <Container>
      <Header>
        <Span>POPULAR FILMS THIS WEEK</Span>
        <SpanMore>MORE</SpanMore>
      </Header>

      <FilmsContainer>
        <Film>
          <Poster src={poster} alt="Poster"></Poster>
        </Film>

        <Film>
          <Poster src={poster} alt="Poster"></Poster>
        </Film>

        <Film>
          <Poster src={poster} alt="Poster"></Poster>
        </Film>

      </FilmsContainer>

    </Container>
  )
}

// Style 
const Container = styled.div`
  position: relative;
  left: 24%; 
  margin-top: 25px; 
  width: 800px;
  height: 500px; 
  //border: 2px solid white; 

  

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
  //border: 2px solid green; 
  height: 85%;
  display: flex; 
  flex-direction: row; 

`;

const Film = styled.div`
  width: 240px; 
  height: 355px;
  margin: 5px; 
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










export default PopularThisWeek; 


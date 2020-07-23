import React, { useState, useEffect, Fragment} from "react"; 
import axios from "axios"; 
import styled from "styled-components"; 


function Film( { movie_id }) {    
  // ex. /film/the-thing

  const [result, set_result] = useState([]);
  const [year, set_year] = useState(""); 
  const [credits, set_credits] = useState([]);
  const [directors, set_directors] = useState([]); 
  const [rating, set_rating] = useState(""); 


  const base = "https://image.tmdb.org/t/p";
  const size = "/w1280/"; // 300, 780, or 1280 for backdrops  
  const poster_size = "/w342/"; 


  useEffect( () => {
    // called on mount 

    const fetch_data = async () => {
      const movie = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
      const credits = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${process.env.REACT_APP_API_KEY}`;
      const release_dates = `https://api.themoviedb.org/3/movie/${movie_id}/release_dates?api_key=${process.env.REACT_APP_API_KEY}`;  

      // movie data 
      let data = await axios.get(movie); 
      set_result(data.data);
      set_year(data.data.release_date.substr(0,4)); 

      // credits 
      data = await axios.get(credits);
      set_credits(data.data); // cast and crew each have arr of objects 

      let directors_arr = [];  // display director, (max 2, if have more redirect to full crew)

      data.data.crew.forEach( (person) => {
        if(person.job === "Director") directors_arr.push(person.name);
      });

      set_directors(directors_arr); 

      // rating 
      data = await axios.get(release_dates);
      console.log(data.data.results); 

      const found = data.data.results.find( (result) => result.iso_3166_1 === "US");
      let certification = found.release_dates[0].certification || {}; 
      certification = typeof certification != undefined ? certification : " ";  
      set_rating(certification); 
    }

    fetch_data(); 
  }, [movie_id]); 


  // format better 
  function display_directors(){
    // if more than 2, link to full list 

    if(directors.length > 2){
      return (
        <Fragment>
          <Director>{directors[0]}</Director>
          <Director>{directors[1]}</Director>
          <Director >...</Director>
        </Fragment>
      )
    }

    else if (directors.length > 1){
      return (
        <Fragment>
          <Director>{directors[0]}</Director>
          <Director>{directors[1]}</Director>
        </Fragment>
      )
    }

    else return <Director>{directors[0]}</Director>
  }


  return (
    <Container>
      <BackDrop src={base + size + result.backdrop_path} alt="backdrop" draggable="false"></BackDrop>

      <Poster src={base + poster_size + result.poster_path} alt="poster"></Poster>

      <Container1> 
        <TitleYearContainer>
          <Title>{result.title}</Title>
          <Year>{`(${year})`}</Year>
          {/* <Rating>{rating}</Rating> */}
        </TitleYearContainer>

        <DirectorContainer>
          <DirectedBy>Directed by</DirectedBy>
          {display_directors()}
        </DirectorContainer>

        <TagLineRatingContainer>
          <TagLine>{result.tagline}</TagLine>
          <Rating>{rating}</Rating>
        </TagLineRatingContainer>

        <Overview>{result.overview}</Overview>
      </Container1> 

      <RatingContainer>
        
      </RatingContainer>

      <DetailsContainer></DetailsContainer>
      
      
    </Container>
  )
}

// Style 
// prob should have used grid layout 
const Container = styled.div`
  margin-top: .5%; 
  border: 2px solid black; 
  height: 100vh;


  width: 60%; 
  position: relative;
  left: 20%;

  display: flex;
  flex-direction: row; 
  justify-content: flex-start;  

`; 

// FIX 
const BackDrop = styled.img`
  // position better? 

  position: absolute; 
  //left: 15%;  

  opacity: .2;
  width: 100%; 

`; 

const Container1 = styled.div`
  margin-top: 18%; 
  display: flex;
  flex-direction: column; 
  color: #e1e3e5; 
  width: 60%; 
`;

const Poster = styled.img`
  margin-top: 20%; 
  z-index: 1;
  width: 230px;
  height: 345px; 
  border: 1px solid #a5a5a5;
  border-radius: 3%;
  margin-left: 5%; 
`;

const TitleYearContainer = styled.div`
  display: flex;
  align-items: center; 
  height: 15%; 
`; 

const Title = styled.div`
  z-index: 1;
  margin-left: 5%; 
  font-size: 3.4em;  
  font-weight: bold; 
`;

const Year = styled.div`
  font-size: 1.4em; 
  margin-top: 1%; 
  margin-left: 2%;
  opacity: .5; 
`; 


const DirectorContainer = styled.div`
  margin-left: 3%; 
  z-index: 1;
  // height: 50%;

  display: flex; 
  flex-direction: row;
  align-items: center; 

  color: #a5a5a5; 
  white-space: nowrap;  

  // border: 1px solid blue; 

`;

const DirectedBy = styled.div`
  margin-left: 2%; 
`;

const Director = styled.h3`
  // only show 1 director (iff multiple, redirect to full list)

  background-color: #273038; 
  border-radius: 8%;
  padding: 10px; 
  text-align: center; 

  margin-left: 1%;

  &:hover{
    cursor: pointer;
    color: #e1e3e5;
  }
`;

// RATING
const RatingContainer = styled.div`
  border: 2px solid green; 

  height: 40%;
  width: 30%; 
   
`;


const TagLineRatingContainer = styled.div`

  display: flex; 
  flex-direction: row; 
`;

const TagLine = styled.div`
  color: #a5a5a5; 
  font-style: italic; 
  width: max-content; 

  display: inline-block;
  margin-top: 2%; 
  margin-left: 4%; 
`;

const Rating = styled.div`
  border: 1px solid #333;
  color: #e1e3e5; 
  padding: 2px; 
  margin-left: 2%; 
  margin-top: 1.5%; 
`;

const Overview = styled.div`
  font-family: Roboto; 
  color: #e1e3e5; 

  width: 70%; 
  
  display: inline-block;
  margin-top: 4%; 
  margin-left: 4%; 
`; 

const DetailsContainer = styled.div`

  border: 1px solid green; 


`; 



// const ViewBackdrops = styled.button`


// `;


export default Film; 








import React, { useState, useEffect, Fragment} from "react"; 
import axios from "axios"; 
import styled from "styled-components"; 
//import Rating from "...."; 
import Tabs from "./Tabs/Tabs.js";

function Film( { movie_id }) {    
  // ex. /film/the-thing

  const [result, set_result] = useState([]);
  const [year, set_year] = useState(""); 
  const [directors, set_directors] = useState([]); 
  const [rating, set_rating] = useState(""); 

  const [credits, set_credits] = useState({
    cast: [],
    crew: []
  });


  const base = "https://image.tmdb.org/t/p";
  const size = "/w1280/"; // 300, 780, or 1280 for backdrops  
  const poster_size = "/w342/"; 


  useEffect( () => {
    // bunch of diff state vars  

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
      set_credits({
         // cast and crew each have arr of objects 
        cast: data.data.cast,
        crew: data.data.crew
      });


      let directors_arr = [];  // display director, (max 2, if have more redirect to full crew)

      data.data.crew.forEach( (person) => {
        if(person.job === "Director") directors_arr.push(person.name);
      });

      set_directors(directors_arr); 

      // rating/certification  
      data = await axios.get(release_dates);

      const found = data.data.results.find( (result) => result.iso_3166_1 === "US");
      let certification = found.release_dates[0].certification || {}; 
      certification = typeof certification != undefined ? certification : " ";  
      set_rating(certification); 
    }

    fetch_data(); 
    //open_info("CAST"); 

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
        <React.Fragment>
          <Director>{directors[0]}</Director>
          <Director>{directors[1]}</Director>
        </React.Fragment>
      )
    }

    else return <Director>{directors[0]}</Director>
  }

  return (
    <React.Fragment>
      <BackDrop src={base + size + result.backdrop_path} alt="backdrop" draggable="false"></BackDrop>

      <Container>
        <TopContainer>

          <Poster src={base + poster_size + result.poster_path} alt="poster"></Poster>

          <InfoContainer> 
            <TitleYearContainer>
              <Title>{result.title}</Title>
              <Year>{`(${year})`}</Year>
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
          </InfoContainer> 

          <RatingContainer>
          </RatingContainer> 
          
        </TopContainer>

        <TabsContainer>          
          <Tabs credits={credits} result={result}></Tabs>
        </TabsContainer>

      </Container>
    </React.Fragment>
  )
}

// Style 
const BackDrop = styled.img`
  position: absolute; 
  opacity: .2;
  left: 16%; 
  top: 10%; 
`; 

const Container = styled.div`
  margin: 0 auto;
  width: 62%; 
  height: max-content; 

  // display: flex;
  // flex-direction: column; 

  //border: 2px solid blue; 
`; 

const TopContainer = styled.div`
  margin-top: 20%; 
  display: flex;
  flex-direction: row; 
  align-items: flex-start; 
  //border: 2px solid white; 
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column; 
  color: #e1e3e5; 

  width: 65%;

  //border: 2px solid white; 
`; 

const Poster = styled.img`
  z-index: 1;
  width: 230px;
  height: 345px; 
  border: 1px solid #a5a5a5;
  border-radius: 3%;
  margin-left: 2%; 
`;

const TitleYearContainer = styled.div`
  display: flex;
  align-items: center; 
  flex-wrap: wrap;
  margin-left: 5%; 
`; 

const Title = styled.div`
  z-index: 1;
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

  display: flex; 
  flex-direction: row;
  align-items: center; 

  color: #a5a5a5; 
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

// PLACEHOLDER for component 
const RatingContainer = styled.div`
  border: 2px solid green; 
  // margin-top: 20%; 
  // margin-right: 2%; 

  width: 250px; 
  height: 300px; 
  
`;


const TagLineRatingContainer = styled.div`
  z-index: 1;
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
  z-index: 1;
  width: 70%; 
  
  display: inline-block;
  margin-top: 4%; 
  margin-left: 4%; 
`; 

const TabsContainer = styled.div`  
  //border: 2px solid white; 
  z-index: 1; 

  //margin: 0 10% 0 10%; 

  position: absolute; 
  top: 84.3%; 
  left: 26%; 
`; 


// TODO maybe 
// const ViewBackdrops = styled.button`
// `;


export default Film; 








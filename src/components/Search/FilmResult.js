import React, { useEffect, useState } from "react";
import styled from "styled-components"; 
import axios from "axios"; 
import {v4 as uuidv4} from "uuid"; // couldnt use result.id as there could be multiple directors for a movie 

function FilmResult( { result } ) {
  // search for a movie, each result is composed of this component 

  // const [directors, set_directors] = useState([]);
  // const [alt_titles, set_alt_titles] = useState([]); 

  const [state, set_state] = useState({
    directors: [],
    alt_titles: []
  }); 

  useEffect( () => {
    const get_specific_data = async () => {
      // director is available under cast in the credits request 
      // alt titles are available in its own request 
  
      let directors = []; // could have more than 1 director 
      let titles = []; 
      let credits = `https://api.themoviedb.org/3/movie/${result.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`; 
      let alt_titles = `https://api.themoviedb.org/3/movie/${result.id}/alternative_titles?api_key=${process.env.REACT_APP_API_KEY}`;
  
      let data = await axios.get(credits); 
      const crew = data.data.crew; 
  
      crew.forEach( (person) => {
        // quick search to get the director among the tens of crew memebers 
        if(person.job === "Director") directors.push(person.name); 
      })
      

      data = await axios.get(alt_titles);
      const titles_arr = data.data.titles; 

      titles_arr.forEach( (title) => {
        // nav data, push each title to the alt_titles arr 
        titles.push(title.title); 
      })

      set_state({
        directors: directors,
        alt_titles: titles
      })
    }

    get_specific_data(); 

  }, [result.id]);




  // MOVE TO SEPERATE FILE! 
  // for api poster, need base url, file size, and file path 
  const base = "https://image.tmdb.org/t/p";
  const size = "/w200/";
  const poster_path = result.poster_path; 
  //const backdrop_path = result.backdrop_path; 
  let path = ""; 
  path = base + size + poster_path; 

  
  function get_year(){
    const year = result.release_date.substr(0, 4); 

    if(year.length === 4) return year;
    else return result.release_date; 
  }


  return (
    <Container>
      <Poster src={path} alt="POSTER MISSING"></Poster>

      <ContainerInfo>
        <ContainerTitleYear>
          <Title>{result.title}</Title>
          <Year>{get_year()}</Year>
        </ContainerTitleYear>

        <AltTitlesContainer>Alternative Titles: {state.alt_titles.toString()}</AltTitlesContainer>

        <DirectorContainer>
          <DirectedBy>Directed By</DirectedBy>
          {
            state.directors.map( (director) => (
              <Director key={uuidv4()}>{director}</Director>

            ))
          }
        </DirectorContainer>
      </ContainerInfo>

    </Container>
  )
}


// Style 
const Container = styled.div`
  border-top: 1px solid #a5a5a5; 
  display: flex;
  flex-direction: row; 
`;

const Poster = styled.img`
  display: block;
  border: 1px solid #a5a5a5;
  border-radius: 3%;
  margin: 10px;

  width: 156px;
  height: 231px; 

  &:hover{
    cursor: pointer;
    border: 4px solid #98fb98;
    margin: 7px;
  }
`;

const ContainerInfo = styled.div`

  display: flex; 
  flex-direction: column; 
  justify-content: space-between; 
  margin: 1% 0% 1% 0%; 
`; 

const ContainerTitleYear = styled.div`
  display: flex; 
  justify-content: flex-start; 
  align-items: center; 

  position: relative; 
  bottom: 8%;  
  width: 90%; 
`;

const Title = styled.h3`
  color: #e1e3e5;
  padding: 3px; 
  font-size: 1.4em;   

  &:hover{
    cursor: pointer;
    color: #adadff; 
  }
`;

const Year = styled.h3`
  margin-left: 2%; 
  color: #a5a5a5;

  &:hover{
    cursor: pointer;
    color: #adadff; 
  }
`;

const AltTitlesContainer = styled.div`
  font-size: .9em;
  color: #a5a5a5;
`;


const DirectorContainer = styled.div`
  display: flex; 
  flex-direction: row;
  align-items: center; 
  color: #a5a5a5;
  font-size: .8em;
`;

const DirectedBy = styled.h3`
  margin-right: 10px; 
`;

const Director = styled.h3`
  background-color: #273038; 
  border-radius: 8%;
  padding: 5px; 
  text-align: center; 
  margin-right: 3px; 

  &:hover{
    cursor: pointer;
    color: #e1e3e5;
  }
`;

export default FilmResult; 

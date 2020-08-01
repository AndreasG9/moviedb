import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";  

 function GenresTab( {genres} ) {

  const history = useHistory();

  const handle_genre = async (genre) => {
    // redirect to /films/genre/ default sorting of popularity desc. 
    const target = `/films/genre/${genre.name.toLowerCase()}`; // ex. genre crime : domain.com/films/genre/crime
    const genres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`; 
    const res = await axios.get(genres); 
    history.push(target, {browseby: "genre", selected: genre.name, genres:res.data.genres});
  }

  return (
    <Container>
      {genres.map( (genre) => (
        <Genre key={genre.id} onClick={() => handle_genre(genre)}>{genre.name}</Genre>
      ))} 
    </Container>
  )
}

// Style
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
`; 

const Genre = styled.div`
  color: #fff;
  opacity: 75%; 
  background-color: #273038; 
  text-align: center; 
  padding: 10px; 
  margin: 2%; 

  &:hover{
    cursor: pointer; 
  }
`;

export default GenresTab; 

import React from "react"; 
import { useHistory } from 'react-router-dom'; 
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { StyledLink } from "../Profile/Profile"; 

 function FilmsResult( {result} ) {

  const poster = `https://image.tmdb.org/t/p/w154/${result.poster_path}`; 
  const year = result.release_date !== undefined ? result.release_date.substr(0, 4) : ""; 
  const tool_tip = `${result.title} (${year})`; 

  const history = useHistory();

  const handle_film = () => {
    // redirect /film/movie-title, pass the movie id to retrieve its data 

    const params = result.title.toString().toLowerCase().replace( / /g, "-"); // ex. search The Witch url: domain.com/search/the-witch
    const target = `/film/${params}`; // ex. search The Witch /film/the-witch
    history.push(target, {movie_id: result.id});
  }

  return (
    <div onClick={handle_film}>
      <StyledLink 
        to={{
          pathname: `/film/${result.id}-${result.title.toString().toLowerCase().replace( / /g, "-")}`, 
          state: {movie_id : result.id}
        }}>
        <ReactTooltip></ReactTooltip>
        <Poster src={poster} alt="poster" data-tip={tool_tip}  data-effect="solid" data-background-color="#425566" data-text-color="#e1e3e5" data-delay-show="200"></Poster>
      </StyledLink>
    </div>
  )
}


const Poster = styled.img`
  display: block; 
  border: 1px solid #a5a5a5;
  border-radius: 3%;

  margin: 6px;  

  &:hover{
    cursor: pointer;
    border: 2px solid #98fb98;
    margin: 5px;  
  }

`; 

export default FilmsResult; 

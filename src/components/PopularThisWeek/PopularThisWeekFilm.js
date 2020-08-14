import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { StyledLink } from ".././Profile/Profile"; 

function PopularThisWeekFilm( {result} ) {
  // props will include poster path, movie id (to link to film if clicked), title, and year 

  const poster = `https://image.tmdb.org/t/p/w400/${result.poster_path}`; 
  const date= result.release_date !== undefined ? result.release_date.substr(0, 4) : " ";
  const tool_tip = `${result.title} (${date})`; 
  const path = result.id + "-" + result.title.toString().toLowerCase().replace( / /g, "-"); // for redirect 

  return (
    <StyledLink key={result.id} to={
      {
        pathname: `/film/${path}`,
        state: {movie_id: result.id}
      }
    }>
      <ReactTooltip></ReactTooltip>
      <Poster src={poster} alt="poster" data-tip={tool_tip}  data-effect="solid" data-background-color="#425566" data-text-color="#e1e3e5" data-delay-show="200"></Poster>
    </StyledLink>
  )
}

// Style 
const Poster = styled.img`
  width: 230px; 
  height: 351px;
  border: 1px solid #a5a5a5;
  border-radius: 2%; 
  margin: 5px;

  &:hover{
    cursor: pointer;
    border: 2px solid #98fb98;
    margin: 4px; 
  }
`;

export default PopularThisWeekFilm; 
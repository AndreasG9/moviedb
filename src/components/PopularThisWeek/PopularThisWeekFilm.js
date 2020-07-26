import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

function PopularThisWeekFilm( {result, i} ) {
  // props will include poster path, movie id (to link to film if clicked), title, and year 

  const poster = `https://image.tmdb.org/t/p/w400/${result.poster_path}`; 
  const tool_tip = `${result.title} (${result.release_date.substr(0, 4)})`; 


  return (
    <div>
      <ReactTooltip></ReactTooltip>
      <Poster src={poster} alt="poster" data-tip={tool_tip}  data-effect="solid" data-background-color="#425566" data-text-color="#e1e3e5" data-delay-show="200"></Poster>
    </div>
  )
}

// Style 

// FIX HOVER WHEN CONTEXT ADDED 
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

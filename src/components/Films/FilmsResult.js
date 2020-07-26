import React from "react"; 
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

 function FilmsResult( {result} ) {

  const poster = `https://image.tmdb.org/t/p/w154/${result.poster_path}`; 
  const tool_tip = `${result.title} (${result.release_date.substr(0, 4)})`; 

  return (
    <div>
      <ReactTooltip></ReactTooltip>
      <Poster src={poster} alt="poster" data-tip={tool_tip}  data-effect="solid" data-background-color="#425566" data-text-color="#e1e3e5" data-delay-show="200"></Poster>
    </div>
  )
}


const Poster = styled.img`
  display: block; 
  border: 1px solid #a5a5a5;
  border-radius: 3%;

  &:hover{
    cursor: pointer;
    border: 2px solid #98fb98;
    margin: 4px; 
  }

  margin: 5px; 
`; 

export default FilmsResult; 

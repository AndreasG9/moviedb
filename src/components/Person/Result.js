import React from "react"; 
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

 function Result( {result} ) {

  const poster = `https://image.tmdb.org/t/p/w154\/${result.poster_path}`; 
  const tool_tip = `${result.title} (${result.release_date.substr(0, 4)})`; 

  //   const character = person.character !== undefined ? person.character : person.job; 

  return (
    <Container>
      <ReactTooltip></ReactTooltip>
      <Poster src={poster} alt="poster" data-tip={tool_tip}  data-effect="solid" data-background-color="#425566" data-text-color="#e1e3e5" data-delay-show="200"></Poster>
      <CharOrJob>{result.job}</CharOrJob>
    </Container>
  )
}

const Container = styled.div`
  margin: 1%; 
`; 

const Poster = styled.img`
  display: block; 
  border: 1px solid #a5a5a5;
  border-radius: 3%;

  width: 156px;
  height: 233px; 

  &:hover{
    cursor: pointer;
    border-color: #98fb98;
  }
`; 

const CharOrJob = styled.div`
  width: 156px; 
  color: #13181c; 
  border-radius: 3%;
  text-align: center; 
  color: #e1e3e5;
`; 

export default Result; 
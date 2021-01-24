import React from "react"; 
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import { StyledLink} from "../Profile/Profile"; 

 function Result( {result} ) {

  const poster = `https://image.tmdb.org/t/p/w154/${result.poster_path}`; 
  const year = result.release_date !== undefined ? result.release_date.substr(0, 4) : " "; 
  const tool_tip = `${result.title} (${year})`; 

  const res = result.character !== undefined ? result.character : result.job; 

  return (
    <StyledLink style={{margin: "1%"}}
      to={{
        pathname: `/film/${result.id}-${result.title.toLowerCase().replace( / /g, "-")}`,
        state: {movie_id : result.id}
      }}>
      <ReactTooltip></ReactTooltip>
      <Poster src={poster} alt="poster" data-tip={tool_tip}  data-effect="solid" data-background-color="#425566" data-text-color="#e1e3e5" data-delay-show="200"></Poster>
      <CharOrJob>{res}</CharOrJob>
    </StyledLink>
  )
}

const Poster = styled.img`
  display: block; 
  border: 1px solid #a5a5a5;
  border-radius: 3%;

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
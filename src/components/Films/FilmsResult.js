import React from "react"; 
import styled from "styled-components";

 function FilmsResult( {result} ) {

  const poster = `https://image.tmdb.org/t/p/w154/${result.poster_path}`; 

  // function get_year(){
  //   // API release date format: "year-month-day"
  //   const year = result.release_date.substr(0, 4); 

  //   if(year.length === 4) return year;
  //   else return result.release_date; 
  // }

  return (
    <div>
      <Poster src={poster} alt="poster">

      </Poster>
    </div>
  )
}



// tool tip 

const Poster = styled.img`
  display: block; 

  border: 1px solid #a5a5a5;
  border-radius: 3%;

  &:hover{
    cursor: pointer;
    border: 2px solid #98fb98;
    margin: 9px; 
  }

  margin: 10px; 
`; 






export default FilmsResult; 

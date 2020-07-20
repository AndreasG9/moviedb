import React from "react";
import styled from "styled-components";

function PopularThisWeekFilm( {result} ) {
  // props will include poster path, movie id (to link to film if clicked), title, and year 

  //console.log(result) ; 
  const poster = `https://image.tmdb.org/t/p/w400/${result.poster_path}`; 

  function get_year(){
    // API release date format: "year-month-day"
    const year = result.release_date.substr(0, 4); 

    if(year.length === 4) return year;
    else return result.release_date; 
  }

  return (
    <Film>
      <ToolTip>{result.title + "  (" + get_year() + ")"}</ToolTip>
      <Poster src={poster} alt="Poster"></Poster>
      
      
    </Film>
  )
}




const ToolTip = styled.span`
  // trying this, ugly lookin  

  position: absolute; 
  left: 6%;
  bottom: 90%;  
  min-width: 180px; 
  min-height: 20px; 
  text-align: center; 
   
  background-color: #425566; 
  font-size: 1.0em; 
  border-radius: 20px; 
  padding: 8px 0; 
  color: #e1e3e5;
  font-style: italic; 

  transform: scale(0);
  
  &:after{
    content: " ";
    position: absolute;
    top: 100%;
    left: 50%;
    
    margin-left: -8px;
    border-width: 8px;
    border-style: solid;
    border-color: #425566 transparent transparent transparent;
  }

  border: 10px solid black; 
`;


const Film = styled.div`
  // margin: 5px; 
  // border: 2px solid green; 

  &:hover .test{
    transition-delay: .4s;
    transform: scale(1);
  }
`;

// FIX HOVER WHEN CONTEXT ADDED 
const Poster = styled.img`
  width: 236px; 
  height: 351px;
  border: 1px solid #a5a5a5;
  border-radius: 2%; 
  margin: 10px; 

  &:hover{
    cursor: pointer;
    border: 2px solid #98fb98;
    margin: 9px; 
  }
`;


export default PopularThisWeekFilm; 

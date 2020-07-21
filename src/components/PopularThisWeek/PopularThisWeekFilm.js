import React from "react";
import styled from "styled-components";

function PopularThisWeekFilm( {result, i} ) {
  // props will include poster path, movie id (to link to film if clicked), title, and year 

  const poster = `https://image.tmdb.org/t/p/w400/${result.poster_path}`; 

  function get_year(){
    // API release date format: "year-month-day"
    const year = result.release_date.substr(0, 4); 

    if(year.length === 4) return year;
    else return result.release_date; 
  }

  function get_left(){
    // tooltip position absolute
    let left = "0%"; 

    if(i === 1) left = "3%";
    else if(i === 2) left = "36%"; 
    else if(i === 3) left = "68%"; 
    else if(i === 4) left = "100%"; 

    return left; 
  }

  return (
    <Film>
      <ToolTip  className="test"  left={get_left()}>{result.title + "  (" + get_year() + ")"}</ToolTip>
      <Poster src={poster} alt="Poster"></Poster>
    </Film>
  )
}

// Style 
const ToolTip = styled.span`
  // trying this, ugly lookin  

  position: absolute;
  bottom: 91%;
  left: ${props => props.left}; 

  min-width: 200px; 
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

`;


const Film = styled.div`

  &:hover .test{
    transition-delay: .4s;
    transform: scale(1);
  }
`;

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

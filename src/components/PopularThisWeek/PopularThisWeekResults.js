import React from "react"; 
import styled from "styled-components";
import PopularThisWeekFilm from "./PopularThisWeekFilm";

function PopularThisWeekResults( { results }) {

  // loading? 

  console.log(results); 

  return (
    <FilmsContainer>
      {
        results.map( (result) => (
          <PopularThisWeekFilm key={result.id} result={result}></PopularThisWeekFilm>
        )) 
      }
      
    </FilmsContainer>
  )
}

const FilmsContainer = styled.div`
  height: 85%;
  display: flex; 
  flex-direction: row; 
`;


export default PopularThisWeekResults; 
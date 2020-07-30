import React from "react"; 
import styled from "styled-components";
import PopularThisWeekFilm from "./PopularThisWeekFilm";

function PopularThisWeekResults( { results }) {

  return (
    <FilmsContainer>
      {
        results.map( (result) => (
          <PopularThisWeekFilm key={result.id} result={result} ></PopularThisWeekFilm>
        )) 
      }
    </FilmsContainer>
  )
}

// Style 
const FilmsContainer = styled.div`
  display: flex; 
  flex-direction: row; 
`;

export default PopularThisWeekResults; 
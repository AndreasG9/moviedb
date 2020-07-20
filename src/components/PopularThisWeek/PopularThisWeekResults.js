import React from "react"; 
import styled from "styled-components";
import PopularThisWeekFilm from "./PopularThisWeekFilm";

function PopularThisWeekResults( { results }) {

  let i = 0; // tooltip is position absolute, left % differs to overlap properly. i goes to 3. ++i 


  return (
    <FilmsContainer>
      {
        results.map( (result) => (
          <PopularThisWeekFilm key={result.id} result={result} i={++i}></PopularThisWeekFilm>
        )) 
      }
    </FilmsContainer>
  )
}

// Style 
const FilmsContainer = styled.div`
  height: 85%;
  display: flex; 
  flex-direction: row; 
`;

export default PopularThisWeekResults; 
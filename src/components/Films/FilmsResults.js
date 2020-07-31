import React from "react";
import styled from "styled-components";
import FilmResult from "./FilmsResult"; 

function FilmsResults( {results, loading}) {

  // if results are empty (ex. select upcoming year of 2029 then say THERE ARE NO FILMS FOR 2029 YET)

  return (
    <Container>
      {results.map( (result) => (
        <Wrap key={result.id}>
          <FilmResult result={result} key={result.id}></FilmResult>
        </Wrap>
      ))}

    </Container>
  )
}

const Container = styled.div`
  display: flex; 
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center; 
`;

const Wrap = styled.div`
  // 5 films a row 
  width: 20%;
  box-sizing: border-box;
`; 

export default FilmsResults; 
import React from "react";
import styled from "styled-components";
import FilmResult from "./FilmsResult"; 

function FilmsResults( {results}) {

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
  width: 80%;
  
  margin: 0 auto;  
  display: flex; 
  flex-direction: row;
  flex-wrap: wrap;
`;

const Wrap = styled.div`
  // 5 films a row 
  width: 20%;
  box-sizing: border-box;
`; 

export default FilmsResults; 

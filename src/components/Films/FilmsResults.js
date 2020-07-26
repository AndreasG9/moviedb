import React from "react";
import styled from "styled-components";
import FilmResult from "./FilmsResult"; 

function FilmsResults( {results, loading}) {

  if(loading) {
   return <Test>LOADING LOADING</Test>
  }; 


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
  justify-content: center; 
`;

const Wrap = styled.div`
  // 5 films a row 
  width: 20%;
  box-sizing: border-box;
`; 

const Test = styled.div`
  width: 1000px
  height: 1000px;
  background-color: white; 

`;

export default FilmsResults; 

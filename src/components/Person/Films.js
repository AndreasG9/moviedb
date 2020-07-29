import React from  "react"; 
import styled from "styled-components"; 
import FilmResult from "../Films/FilmsResult.js"; 

 function Films( {results}) {
   // mostly similiar to the other component apart from layout 


   return (
    <Container>
      {/* {results.map( (result) => (
        <Wrap key={result.id}>
          <FilmResult result={result} key={result.id}></FilmResult>
        </Wrap>
      ))} */}

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
  // 4 films a row 
  width: 25%;
  box-sizing: border-box;
`; 

export default Films; 

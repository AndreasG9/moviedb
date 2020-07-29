import React, {  } from  "react"; 
import styled from "styled-components"; 
import FilmResult from "../Films/FilmsResult.js"; 

 function Films( {credits, dept}) {
   // mostly similiar to the other component apart from layout 
   // dept is the arr of objects for that specific department that person has a credit in.
   
   console.log(credits); 


    function get_film(){
      if(credits !== undefined){
        return (
          credits.map( (credit) => (
            <Wrap key={credit.id}>
              <FilmResult key={credit.id} result={credit}></FilmResult>
            </Wrap>
          ))
        )
      }
    }


   return (
    <Container>
      {get_film()}
    </Container>
  )
}

const Container = styled.div`
  //width: 60%;
   
  margin-top: 3% 1% 0 0; 
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

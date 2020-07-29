import React, {  } from  "react"; 
import styled from "styled-components"; 
import Result from "./Result.js"; 
import {v4 as uuidv4} from "uuid"; 

 function Films( {credits, dept}) {
   // mostly similiar to the other component apart from layout 
   // dept is the arr of objects for that specific department that person has a credit in.
  
    function get_film(){
      if(credits !== undefined){
        return (
          credits.map( (credit) => (
            <Result key={uuidv4()} result={credit}></Result>
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
   

  display: flex; 
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start; 

  //border: 2px solid white; 
`;

// const Wrap = styled.div`
//   // 4 films a row 
//   width: 25%;
//   box-sizing: border-box;
// `; 

export default Films; 

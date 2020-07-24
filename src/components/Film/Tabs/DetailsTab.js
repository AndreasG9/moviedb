import React from "react";
import styled from "styled-components";
import {v4 as uuidv4} from "uuid"; 

function DetailsTab( {result} ) {
  // display og language, budget, alt titles, and runtime 

  const format_budget = result.budget !== undefined ? result.budget.toString().replace(/(.)(?=(\d{3})+$)/g,'$1,') : undefined; 
  const production_companies = result.production_companies !== undefined ? result.production_companies.map( (company) => company.name) : []; 

  return (
    <Container>

      <KeyValue>
        <Key>Runtime</Key>
        <Value>{result.runtime + " mins"}</Value>
      </KeyValue>

      <KeyValue>
        <Key>Original Language</Key>
        <Value>{result.original_language}</Value>
      </KeyValue>

      <KeyValue>
        <Key>Budget</Key>
        <Value>{"$" + format_budget}</Value>
      </KeyValue>
      
      <KeyValue>
        <Key>Production Companies</Key>
          <Values>
          {production_companies.map( (company) => (
            <Value smaller key={uuidv4()}>{company}</Value>
          ))}
          </Values>
      </KeyValue>

    </Container>
  )
}

const Container = styled.div`
  margin-top: 5%; 
  font-family: Roboto;
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
  grid-template-rows: repeat(2, 1fr); 

`;


const KeyValue = styled.div`
  display: flex;
  flex-direction: column; 
  margin: 2%;  
`;


const Key = styled.div`
  align-self: center; 
  color: #a5a5a5;
  font-style: italic;  
`;


const Value = styled.div`
  color: #fff;
  opacity: 75%; 
  background-color: #273038; 
  text-align: center; 
  font-size: ${props => props.smaller ? ".8em" : "1em" }; 
  padding: ${props => props.smaller ? "2px" : "10px" }; 
  margin: ${props => props.smaller ? "2%" : "0 0 0 5%" }; 
`;


const Values = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); 
`;





export default DetailsTab; 

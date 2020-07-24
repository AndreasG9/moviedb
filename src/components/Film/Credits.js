import React, { useState} from "react";
import styled from "styled-components"; 
import Person from "./Person"; 

function Credits( { credits } ) {
  // prop credits is either cast or crew 
  // w/ pagination arrows 

  const [current_page, set_current_page] = useState(1); 
  const posts_per_page = 4; 
  const max = 0; 


  const index_last = current_page * posts_per_page; 
  const index_first = index_last - posts_per_page;
  const current = credits.slice(index_first, index_last); 

  // Funcs 
  const next = () => {
    set_current_page(current_page + 1); 

    if(current_page === 4){
      // disable pointer event, change opacity 
      
    }

    else{
      // gets called multiple times but its fine 
      
    }

  }


  const prev = () => {
    set_current_page(current_page - 1); 

    
  }




  return (
    <Container>
      <Arrow onClick={prev}>{"<"}</Arrow>
        {current.map( (person) => (
          <Person person={person} key={person.id}></Person>
        ))}
      <Arrow onClick={next}>{">"}</Arrow>
    </Container>
  )
}

const Container = styled.div`
  display: flex; 
  flex-direction: row; 
  border: 1px solid blue; 
`;

const Arrow = styled.span`
  color: #6f797d; 
  font-size: 2.5em; 
  padding: 8px; 
  font-weight: bold; 

  &:hover{
    cursor: pointer; 
    color: #e1e3e5;
  }
  
  margin-top: 15%; 


  // opacity: ${props => props.active ? "1" : ".2"}; 
  // pointer-events: ${props => props.active ? "auto" : "none"}; 

  
  -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;







export default Credits; 

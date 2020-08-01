import React, { useState} from "react";
import styled from "styled-components"; 
import Person from "./Person";
import {v4 as uuidv4} from "uuid"; // crew members can have multiple credits

function Credits( { credits } ) {
  // prop credits is either cast or crew 
  // w/ pagination arrows 

  const [current_page, set_current_page] = useState(1); 
  const posts_per_page = 5; 
  const total_pages = Math.floor(credits.length / posts_per_page); 
  
  const [active, set_active] = useState({
    left: false,
    right: true
  }); 


  const index_last = current_page * posts_per_page; 
  const index_first = index_last - posts_per_page;
  const current = credits.slice(index_first, index_last); 

  // Pagination with arrows 
  const next = () => {
    set_current_page(current_page + 1); 

    if(current_page === total_pages) set_active({left: true, right: false}); 
    else set_active({left: true, right: true}); 
  }


  const prev = () => {
    set_current_page(current_page - 1); 

    if(current_page === 2) set_active({left: false, right: true}); 
    else set_active({left: true, right: true}); 
  }


  return (
    <Container>
      <Arrow onClick={prev} active={active.left}>{"<"}</Arrow>
        {current.map( (person) => (
          <Person person={person} key={uuidv4()}></Person>
        ))}
      <Arrow onClick={next} active={active.right}>{">"}</Arrow>
    </Container>
  )
}

const Container = styled.div`
  display: flex; 
  flex-direction: row;  
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
  
  margin-top: 12%; 


  opacity: ${props => props.active ? "1" : ".2"}; 
  pointer-events: ${props => props.active ? "auto" : "none"}; 

  
  -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;

export default Credits; 

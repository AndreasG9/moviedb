import React, { useState } from "react"; 
import styled from "styled-components"; 

const Pagination = ( {posts_per_page, total_pages} ) => {

  const page_limit = 10; 
  total_pages = total_pages > 10 ? page_limit : total_pages; // if you search "the" you will get 500 total pages, I only take the first 10 

  const page_numbers = [];
  for(let i=0; i<total_pages+1; ++i) page_numbers.push(i); 


  // put in Search.js ! 
  const [active, set_active] = useState({
    // disable pagination buttons if no more results 
      left: false,
      right: true
  });

  return (
    <Nav>
      <Button active={active.left}>Previous</Button>
      <UList>
        {page_numbers.map( (num) => (
          <Item key={num}>
            <A href= "!#" >{num}</A>
          </Item>
        ))}
      </UList>
      <Button active={active.right}>Next</Button>
    </Nav>
  )
} 


// Style 
const Button = styled.button`
  margin-top: 5px; 
  width: 18%; 
  height: 5%; 
  padding: 10px; 
  background-color: #273038; 
  text-align: center; 
  border: none; 
  border-radius: 5%; 
  color: #a5a5a5;

  &:hover{
    cursor: pointer;  
    opacity: .3; 
    color: #e1e3e5;
  }

  transform: ${props => props.active ? "scale(1)": "scale(0)"}; 
`;

const Nav = styled.nav`
  border-top: 1px solid #a5a5a5; 
  display: flex;
  flex-direction: row; 
  align-items: center;
  justify-content: space-between; 
  padding: 10% 0; 
`;

const UList = styled.ul`
  list-style: none; 
  display: flex;
  flex-direction: row; 
  justify-content: center; 

  padding: 0; 
  margin: 0 2% 0 2%; 
`;

const Item = styled.li`
  padding: 6px; 

  &:hover{
    background-color: #273038 
  }
`;

const A = styled.a`
  color: #a5a5a5;
`;










export default Pagination; 
import React, { useState } from "react"; 
import styled from "styled-components"; 

const Pagination = ( {total_pages, prev, next, go_to_page} ) => {

  const page_limit = 10; 
  const total = total_pages > 10 ? page_limit : total_pages; // if you search "the" you will get 500 total pages, I only take the first 10, add pagination w/ dots in the future for all pages

  const page_numbers = [];
  for(let i=1; i<total+1; ++i) page_numbers.push(i); 
    

  const [active, set_active] = useState({
    // disable pagination buttons if no more results 
      left: true,
      right: true
  });


  return (
    <Nav className="media-width-50">
      <Button active={active.left} onClick={prev}>Previous</Button>
      <UList>
        {page_numbers.map( (num) => (
          <Item key={num} onClick={() => go_to_page(num)}>
            {num}
          </Item>
        ))}
      </UList>
      <Button active={active.right} onClick={next}>Next</Button>
    </Nav>
  )
} 


// Style 
const Nav = styled.nav`
  border-top: 1px solid #a5a5a5; 
  display: flex;
  flex-direction: row; 
  align-items: center;
  justify-content: space-between; 
  padding: 2% 0; 
`;

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
  color: #a5a5a5;
  
 // background-color: #273038; 

  &:hover{
    background-color: #273038; 
    cursor: pointer; 
  }



`;

const A = styled.a`

  text-decoration: none;
`;










export default Pagination; 
import React, { useState } from "react";
import  { useHistory} from "react-router-dom";
import styled from "styled-components"; 

function SearchBar() {

  // State 
  const [query, set_query] = useState(""); 
  const history = useHistory();

  const update_search = (event) => {
    // onChange with input
    set_query(event.target.value);

  }

  const get_search = async (event) => { 
    event.preventDefault();
    if(query){
      const path = query.replace(/\s/g, "+"); // ex. search The Witch url: domain.com/search/the+witch
      const target = `/search/${path}`; 
      history.push(target, {query:query}); // redirect to /search, loads the search component, pass query 
    }
  }
  

  return (
    <div style={center}>
      <form onSubmit={get_search}>
        <Container>
        <div style={box}>
            <Input 
              type="text" 
              onChange={update_search}
              placeholder="Search for film or person">
            </Input>
            <Button 
              type="submit">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            </Button>
        </div>
        </Container>
      </form>   
    </div>
  ); 
}


// Style 
const Container = styled.div`
  margin-top: 9%; 
  position: relative; 
  left: 8.5%; 
`;

export const Input = styled.input`
  font-family: Roboto;
  background-color: #2b3440;
  border: none;  
  flex-grow: 2; 
  width: 240px;
  height: 30px;   
  padding: 5px;

  &:focus{
    outline: none;
    background-color: #e1e3e5;
  }
`;

const Button = styled.button`
  background-color: #e1e3e5;
  border: none;
  border-left: 2px solid #2b3440; 

  &:hover{
    cursor: pointer;
  }

  &:focus{
    outline: none; 
  }

  &:active{
    background-color: #2b3440; 
  }
`;

const box = {
  display: "flex",
  flexDirection: "row",
  padding: "1px"
}

const center = {
  marginBottom: "30px"   
}

export default SearchBar; 
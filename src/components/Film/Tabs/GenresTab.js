import React from "react";
import styled from "styled-components";

 function GenresTab( {genres} ) {

  return (
    <Container>
      {genres.map( (genre) => (
        <Genre key={genre.id}>{genre.name}</Genre>
      ))} 
    </Container>
  )
}

// Style

const Container = styled.div`
  margin: 10%; 
`; 

const Genre = styled.div`
  color: #fff;
  opacity: 75%; 
  background-color: #273038; 
  text-align: center; 
  padding: 10px; 
  margin: 4%; 

  &:hover{
    cursor: pointer; 
  }

`;


export default GenresTab; 

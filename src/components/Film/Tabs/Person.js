import React, {} from "react"; 
import styled from "styled-components"; 
import missing_portrait from "../../../missing_portrait.png"; 


function Person( {person} ) {
  // person contains data on cast or crew person (have different k,v pairs)

  const character = person.character !== undefined ? person.character : person.job; 

  return (
    <Container>
      <Profile 
        src={`https://image.tmdb.org/t/p/w185${person.profile_path}`} 
        alt="portrait" 
        onError={ (event) => event.target.src = missing_portrait }>
      </Profile>

      <Name>{person.name}</Name>
      <CharacterOrJob>{character}</CharacterOrJob>

    </Container>
  )
}


const Container = styled.div`
  margin: 5px; 
  border: 1px solid #eee; 
  border-radius: 4%; 
  font-family: Roboto; 
  background-color: #e1e3e5; 
  text-align: center; 

  width: 138px;  
  height: 300px;  

  &:hover{
    cursor: pointer;
  }

`; 

const Profile = styled.img`
  border-radius: 4% 4% 0 0; 
  display: block; 
  height: 207px; 
  width: 138px; 
`;

const Name = styled.div`
  margin-top: 2%; 
  font-weight: bold;
`;

const CharacterOrJob = styled.div`
  margin-top: 2%; 
`;


export default Person; 

import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { useHistory } from "react-router-dom"; 
import styled from "styled-components"; 
import missing_portrait from "../../missing_portrait.png"; 


function SearchResultPerson( {result}) {

  const [person , set_person] = useState([]); 


  useEffect( () => {

    const get_data = async () => {
      // result has all the details I want to present except for the profile path the person 

      const person = `https://api.themoviedb.org/3/person/${result.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`; 
      const data = await axios.get(person); 
      set_person(data.data); 
    }

    get_data(); 

  }, [result.id]);

  function also_known_as(){
    if(person.also_known_as !== undefined) return<AltNamesContainer>Also Known As: {person.also_known_as} </AltNamesContainer>
  }


  const history = useHistory();

  const handle_person = () => {
    // redirect to person/person-name 
    const params = person.name.toLowerCase().replace( / /g, "-"); // ex. search The Witch url: domain.com/search/the-witch
    const target = `/person/${params}`; 
    history.push(target, {credit: person.id});
  }


  return (
    <Container onClick={handle_person}>
      <Profile 
        src={`https://image.tmdb.org/t/p/w185${person.profile_path}`} 
        alt="portrait" 
        onError={ (event) => event.target.src = missing_portrait }>
      </Profile>

      <ContainerInfo>
        <Name>{person.name}</Name>
        {also_known_as()}

        <KnownForContainer>
          <label>Known For: </label>
          <KnownFor>
            {person.known_for_department}
          </KnownFor>
        </KnownForContainer>
      </ContainerInfo>

    </Container>
  )
}

// Style 

const Container = styled.div`
  border-top: 1px solid #a5a5a5; 
  display: flex;
  flex-direction: row; 
`;

const Profile = styled.img`
  display: block;
  border: 1px solid #a5a5a5;
  border-radius: 3%;
  margin: 10px;

  width: 156px;
  height: 231px; 

  &:hover{
    cursor: pointer;
    border: 4px solid #98fb98;
    margin: 7px;
  }
`;

const ContainerInfo = styled.div`
  display: flex; 
  flex-direction: column; 
  justify-content: space-between; 
  margin: 1% 0% 1% 0%; 
`; 

const Name = styled.div`
  color: #e1e3e5;
  padding: 3px; 
  font-size: 1.4em;   

  &:hover{
    cursor: pointer;
    color: #adadff; 
  }
`;

const AltNamesContainer = styled.div`
  font-size: .9em;
  color: #a5a5a5;
`;

const KnownForContainer = styled.div`
  color: #a5a5a5;
`;

const KnownFor = styled.span`
  font-size: 1.2em; 
  color: #e1e3e5;
`;




export default SearchResultPerson; 

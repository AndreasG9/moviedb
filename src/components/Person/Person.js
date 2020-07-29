import React, { useState, useEffect } from "react"; 
import styled from "styled-components"; 
import axios from "axios"; 
import Films from "./Films"; 

function Person( {credit}) {
  // limited to cast(actor) crew(director, writer, producer, cinematography/ director of photography, editor, and make-up) 

  // KNOWN FOR 

  //const [person_id, set_person_id] = useState(0); 

  const [person , set_person] = useState([]); 
  const [credits, set_credits] = useState([]); 
  const [job, set_job] = useState(""); 
  const [show_more, set_show_more] = useState(false); 


  useEffect( () => {

    const get_data = async () => {
      const details = `https://api.themoviedb.org/3/person/${credit}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`; 
      const cr = `https://api.themoviedb.org/3/person/${credit}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`

      let data = await axios.get(details); 
      set_person(data.data); 
      

      data = await axios.get(cr);
      set_credits(data.data);
      console.log(data.data); 


    }

    get_data(); 

  }, []);


  function get_bio(){
    // show first 100 chars of bio, then read more to expand 

    if(person.biography !== undefined){

      const bio = person.biography; 
      const show = bio.slice(0, 100);
      const next = bio.slice(100);


      if(show.length < bio.length){
        // read more 
        return <About>{show}<MoreBtn onClick={handle_more} show_more={show_more}>...more</MoreBtn><More show_more={show_more}>{next}<LessBtn onClick={handle_less} show_more={show_more}>less...</LessBtn></More></About>
      }

      else return <p>{show}</p>
    }
  }

  const handle_more = () => {
    set_show_more(true); 
  }
  const handle_less = () => {
    set_show_more(false); 
  }




  return (
    <Container>

      <Container1>
      <HeaderContainer>
        <Title>FILMS {"put filter"} by</Title>
        <Name>{person.name}</Name>
      </HeaderContainer>

      <FiltersContainer>
      </FiltersContainer>

      <FilmsContainer>
        <Films></Films>
      </FilmsContainer>
      </Container1>
      
      <ProfileContainer>
        <Profile src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}></Profile>
        {get_bio()}
      </ProfileContainer>

    </Container>


  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  font-family: Roboto; 


 // width: 60%; 
  margin: 0 auto;
  margin-top: 2%; 
  border: 2px solid white;  
`; 

const Container1 = styled.div`
  display: flex;
  flex-direction: column; 
`;

const HeaderContainer = styled.div`

  display: flex;
  flex-direction: column; 
`;

const Title = styled.h3`
  margin: 0; 
  color: #a5a5a5;
`; 

const Name = styled.h2`
  margin: 0; 
  color: #e1e3e5;
`; 

const FiltersContainer = styled.div`
  // TODO 
  border: 2px solid white; 
  height: 30px;  

  margin-top: 2%;  
`; 

const FilmsContainer = styled.div`
  margin-top: 2%; 
  border: 2px solid blue; 
`; 

const ProfileContainer = styled.div`
  border: 2px solid blue; 
  
  width: 25%; 
`;

const Profile = styled.img`
  outline: 1px solid #a5a5a5;
`;

const About = styled.p`
  color: #a5a5a5;
`;

const MoreBtn = styled.button`
  margin-left: 1%; 
  border: none; 
  background: none; 
  padding: 3px;  
  color: #e1e3e5;

  &:hover{
    cursor: pointer; 
    color: #adadff; 
  }

  &:focus{
    outline: none; 
  }

  display: ${(props) => props.show_more ? "none" : "inline"};
`; 

const More = styled.span`
  display: ${(props) => props.show_more ? "inline" : "none"};
`; 

const LessBtn = styled.button`
  display: ${(props) => props.show_more ? "inline" : "none"};

  margin-left: 1%; 
  border: none; 
  background: none; 
  padding: 3px;  
  color: #e1e3e5;

  &:hover{
    cursor: pointer; 
    color: #adadff; 
  }

  &:focus{
    outline: none; 
  }
`; 



export default Person; 

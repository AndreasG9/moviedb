import React, { useState, useEffect } from "react"; 
import styled from "styled-components"; 
import axios from "axios"; 
import Films from "./Films"; 

function Person( {credit}) {

  const [person , set_person] = useState([]); 
  const [credits, set_credits] = useState([]); 
  const [crew_depts, set_crew_depts] = useState({}); // filled w/ k,v pairs (department: count arr (numbers dont matter here, only length of arr)); 
  const [current_dept, set_current_dept] = useState(""); 
  const [show_more, set_show_more] = useState(false); 


  useEffect( () => {

    const get_data = async () => {
      const details = `https://api.themoviedb.org/3/person/${credit}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`; 
      const cr = `https://api.themoviedb.org/3/person/${credit}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`

      let data = await axios.get(details); 
      set_person(data.data); 
      //set_current_dept({name: data.data.known_for_department, credit: []});
      set_current_dept(data.data.known_for_department); 

      data = await axios.get(cr);
      set_credits(data.data);


      let map = data.data.crew.map( (credit) => credit.department); // get all departments the person has a credit 
      //let depts = [...new Set(map)]; // for the department options 
      let temp = {}; 


      // FIX FIX --------------------------------- FIX 
      map.forEach( (dept, count) => {
        // go from 0 to crew.length 
        // a single object w/ k,v pairs
        // key is the name of the dept and the value is an array of numbers, whose length is the count of occurances 
        if(!temp[dept]) temp[dept] = [count]; // initial
        else temp[dept].push(count); // add incrementing num 
      });

      console.log(temp); 

      set_crew_depts(temp); 

    }

    get_data(); 

  }, [credit]);


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

  const handle_dept = (event) => {
    set_current_dept(event.target.value); 
  }

  function get_count(dept){
    const indexes = crew_depts[dept]; 
    return indexes.length; 
  }


  function get_dept_credits(){
    // pass arr of objects containing films info for the specific dept that person has credit/credits for 
    
   // if(current_dept.name === "") set_current_dept({name: person.known_for_department, credits: []}); // default 
    console.log(current_dept);

    const indexes = crew_depts[current_dept];

    if(indexes !== undefined){
      let start = indexes[0];
      let end = indexes[indexes.length -1];
      let current = credits.crew.slice(start, end+1); 

      return current; 
    }
  }

  function get_title(){
    // actor TODO 

    let title = "";

    if(current_dept !== undefined){
      if(current_dept.includes("Directing")) title = "DIRECTED";
      else if(current_dept.includes("Writing")) title = "WRITTEN";
      else if(current_dept.includes("Camera")) title = "WITH CAMERA WORK";
      else if(current_dept.includes("Art")) title = "WITH ART";
      else if(current_dept.includes("Lighting")) title = "WITH LIGHTING";
      // else if(current_dept === "Crew") title = "WITH CREW WORK";
      // else if(current_dept === "Sound") title = "WITH SOUND WORK";
      // else if(current_dept === "Visual Effects") title = "WITH VISUAL EFFECTS";
      // else if(current_dept === "Costume & Make-Up") title = "WITH COSTUME & MAKE-UP";
      // else if(current_dept === "Editing") title = "WITH EDITING";
      // else if(current_dept === "Production") title = "WITH PRODUCTION";
      else title = "some dept";

      return title; 
    }
  }


  return (
    <Container>

      <Container1>
      <HeaderContainer>
        <Title>FILMS {get_title()} BY</Title>
        <Name>{person.name}</Name>
      </HeaderContainer>

      <FiltersContainer>
        <Select onChange={handle_dept}>
          <Option hidden>Department</Option>
          {Object.keys(crew_depts).map( (dept) => (
            <Option key={dept}>{dept}   ({get_count(dept)})</Option>
            ))}
        </Select>
        
        <Select>
          <Option hidden>Sort By</Option>
          <Option>Popular Descending</Option>
          <Option>Popular Ascending</Option>
          <Option>Rating Descending</Option>
          <Option>Rating Ascending</Option>
          <Option>Release Date Descending</Option>
          <Option>Release Date Ascending</Option>
        </Select>


      </FiltersContainer>


        <Films credits={get_dept_credits()} dept={current_dept}></Films>

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


  width: 60%; 
  margin: 0 auto;
  margin-top: 2%; 
  //border: 2px solid white;  
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
  border-top: 2px solid #a5a5a5;;
  border-bottom: 2px solid #a5a5a5;;
  margin: 2% 0;  
  //width: 50%; 
`; 

const Select = styled.select`
  margin: 1%; 
  font-family: Roboto;
  background-color: #13181c; 
  color: #e1e3e5;
  padding: 5px; 

  &:hover{
    color: #adadff;
    cursor: pointer; 
  }

  &:focus{
    outline: none; 
  }
`; 



const Option = styled.option`
  background-color: #8699aa; 
  color: #333; 
  font-size: 1.4em; 
`; 

const ProfileContainer = styled.div`
  //border: 2px solid blue; 
  
  width: 35%; 
  margin-left: 1%; 
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

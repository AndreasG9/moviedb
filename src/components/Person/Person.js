import React, { useState, useEffect } from "react"; 
import styled from "styled-components"; 
import axios from "axios"; 
import Films from "./Films"; 
import { useHistory, useLocation } from "react-router-dom";

function Person( {credit}) {

  const location = useLocation();
  const history = useHistory(); 

  if(credit === undefined){
    // got here with Link opened in new tab, no state. have to read url path to get credit id 
    const temp = location.pathname.split("/");
    credit = temp[2].split("-")[0]; 

    if(isNaN(credit)) {
      // err 
      history.push("/404"); 
      credit = ""; 
    }
  }
  
  const [person , set_person] = useState([]); 
  const [credits, set_credits] = useState([]); 
  const [crew_depts, set_crew_depts] = useState({}); // filled w/ k,v pairs (department: count arr (numbers dont matter here, only length of arr)); 
  const [cast, set_cast] = useState([]); 
  const [current_dept, set_current_dept] = useState(""); 

  const [sort_by, set_sort_by] = useState("Popularity Descending"); 
  const [show_more, set_show_more] = useState(false); 

  const[loading, set_loading] = useState(false); 

  useEffect( () => {

    const get_data = async () => {
      set_loading(true); 
      const details = `https://api.themoviedb.org/3/person/${credit}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`; 
      const cr = `https://api.themoviedb.org/3/person/${credit}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`

      let data = await axios.get(details); 
      set_person(data.data); 
      set_current_dept(data.data.known_for_department); 

      data = await axios.get(cr);
      set_credits(data.data);

      // Cast (if present)
      if(data.data.cast.length > 1){
        set_cast(data.data.cast); 
      }

      // Crew (if present)
      if(data.data.crew.length > 1){

        // FORMAT 
        let map = data.data.crew.map( (credit) => credit.department); // get all departments the person has a credit 
        let temp = {}; 

        map.forEach( (dept, count) => {
          // go from 0 to crew.length 
          // a single object w/ k,v pairs
          // key is the name of the dept and the value is an array of numbers, whose length is the count of occurances 
          if(!temp[dept]) temp[dept] = [count]; // initial
          else temp[dept].push(count); // add incrementing num 
        });
        set_crew_depts(temp); 
      }
      set_loading(false); 
    }

    if(credit) get_data(); 

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
    // ignore the count in dept (count) 
    const index = event.target.value.indexOf(" ");
    const dept = event.target.value.substr(0, index); 
    set_current_dept(dept); 
  }

  function get_count(dept){
    // crew
    const indexes = crew_depts[dept]; 
    return indexes.length; 
  }

  function get_cast_option(){
    // only if person has cast credits 
    if(cast.length > 1) return <Option>Acting  ({cast.length})</Option>; 
  }

  function get_profile_path(){
    if(person.length > 0) return <Profile src={`https://image.tmdb.org/t/p/w185/${person.profile_path}`}></Profile>; 
  }

  function get_dept_credits(){
    // pass arr of objects containing films info for the specific dept that person has credit/credits for  

    let indexes; 
    let current;

    if(current_dept !== "Acting"){
      // crew
      indexes = crew_depts[current_dept]; // return an array of indexes, which correspond to that dept in the credits arr

      if(indexes !== undefined){
        let start = indexes[0];
        let end = indexes[indexes.length -1];
        current = credits.crew.slice(start, end+1); 
        }
    }

    else current = cast; 

    

    // have to SORT ourselves (Popularity, rating, or release date, all whivh asc or desc)  
   if(current !== undefined){
      if(sort_by === "Popularity Descending") current.sort((a, b) => (a.popularity > b.popularity) ? -1 : 1);
      else if(sort_by === "Popularity Ascending") current.sort((a, b) => (a.popularity > b.popularity) ? 1 : -1);
      else if(sort_by === "Rating Descending") current.sort((a, b) => (a.vote_average > b.vote_average) ? -1 : 1);
      else if(sort_by === "Rating Ascending") current.sort((a, b) => (a.vote_average > b.vote_average) ? 1 : -1);
      else if(sort_by === "Release Date Descending") current.sort((a, b) => (a.release_date > b.release_date) ? -1 : 1);
      else if(sort_by === "Release Date Ascending") current.sort((a, b) => (a.release_date > b.release_date) ? 1 : -1);
   }

    // console.log(current); 

    return current; 

  }

  const handle_sort_by = (event) => {
    set_sort_by(event.target.value); 
  }



  return (
    <Container>

      <Container1>
      <HeaderContainer>
        <Title>Films With {current_dept} By</Title>
        <Name>{person.name}</Name>
      </HeaderContainer>

      <FiltersContainer>
        <Select onChange={handle_dept}>
          {/* <Option hidden>Department</Option> */}
          <Option hidden>{current_dept}</Option>
          {get_cast_option()}
          {Object.keys(crew_depts).map( (dept) => (
            <Option key={dept}>{dept}   ({get_count(dept)})</Option>
            ))}
        </Select>
        
        <Select onChange={handle_sort_by}>
          {/* <Option hidden>Sort By</Option> */}
          <Option>Popularity Descending</Option>
          <Option>Popularity Ascending</Option>
          <Option>Rating Descending</Option>
          <Option>Rating Ascending</Option>
          <Option>Release Date Descending</Option>
          <Option>Release Date Ascending</Option>
        </Select>
      </FiltersContainer>

        {loading ? 
          <p>TEST LOADING</p> : 
          <Films credits={get_dept_credits()} dept={current_dept}></Films>
        }


      </Container1>
      
      <ProfileContainer>
        {get_profile_path()}
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
  
  @media only screen and (max-width: 1500px) {
    width: 70%; 
    margin: 2% 0 0 8.9%; 
  }
`; 

const Container1 = styled.div`
  display: flex;
  flex-direction: column; 
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column; 
  margin-left: 1.2%; 
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
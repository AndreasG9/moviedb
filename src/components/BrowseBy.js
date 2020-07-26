import React from "react"; 
import { useHistory } from "react-router-dom"; 
import styled from "styled-components"; 


function BrowseBy( ) {
  // BrowseBy Popular, Rating, Genre, Year 
  // path home/popular/ sorting method , home/rating/ sorting method  .... 
  // home/popular/this/month ... 

  const GENRES = ["ACTION", "ADVENTURE", "ANIMATION", "COMEDY", "CRIME", "DOCUMENTARY", "DRAMA", "FAMILY", "FANTASY", "HORROR", "MUSIC", "MYSTERY", "ROMANCE", "SCIFI", 
                  "TV MOVIE", "THRILLER", "WAR", "WESTERN"]; 
  const YEARS = ["UPCOMING", "2020s", "2010s", "2000s", "1990s", "1980s", "1970s", "1960s", "1950s", "1940s", "1930s", "1920s", "1910s", "1900s"]; 

  const history = useHistory(); 

  function get_selected(select, event){
    // redirect to /films/browse-by/selected 
    let selected = event.target.value; 

    const target = `/films/${select}/{selected}`; // ex. genre crime : domain.com/films/genre/crime
    history.push(target, {browseby: select, selected: selected});
  }

  return (
    <Container>
      <Label>BROWSE BY</Label>

      <Container2>
        {/* <Select>
          <Option hidden>POPULAR</Option>
          <Option>ALL TIME</Option>
          <Option>THIS YEAR</Option>
          <Option>THIS MONTH</Option>
          <Option>THIS WEEK</Option>
        </Select> */}

        <Select>
          <Option hidden>YEAR</Option>
          {YEARS.map( (year) => (
            <Option key={year}>{year}</Option>
          ))}
        </Select>

        <Select>
          <Option hidden>RATING</Option>
          <Option>HIGHESt FIRST</Option>
          <Option>LOWEST FIRST</Option>
        </Select>

        <Select onChange={ (event) => get_selected("genre", event) }>
          <Option hidden>GENRE</Option>
          {GENRES.map( (genre) => (
            <Option key={genre}>{genre}</Option>
          ))}

        </Select>
        </Container2>
    </Container>
  )
}

// Style 
const Container = styled.div`
  font-family: Roboto; 
  margin: 3% 0; 
  width: 50%; 
  

  position: relative;
  left: 24%; 
  display: flex; 
  align-items: center; 
`;

const Container2 = styled.div`
  position: relative; 
  left: 2%; 
  outline: 1px solid #5e6a76; 

  display: flex;
  align-items: center; 
`;

const Label = styled.label`
  color: #6f797d;
  font-size: .9rem; 
  
  &:hover{
    cursor: text; 
  }
`;

const Select = styled.select`
  font-family: Roboto; 
  font-size: 1.0rem; 
  background-color: #13181c; 
  color: #e1e3e5;
  padding: 5px; 
  text-indent: 10px; 

  &:hover{
    color: #adadff;
  }

  &:focus{
    outline: none; 
  }
`;

const Option = styled.option`
  background-color: #8699aa; 
  color: #333; 
  text-align: center; 
  font-size: 1.2rem; 
`;

export default BrowseBy; 

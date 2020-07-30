import React, { useState, useEffect } from "react"; 
import { useHistory } from "react-router-dom"; 
import styled from "styled-components"; 
import axios from "axios"; 


function BrowseBy() {
  // BrowseBy Popular, Rating, Genre, Year 
  // path home/popular/ sorting method , home/rating/ sorting method  .... 

  const YEARS = ["UPCOMING", "2020s", "2010s", "2000s", "1990s", "1980s", "1970s", "1960s", "1950s", "1940s", "1930s", "1920s", "1910s", "1900s"]; 

  const history = useHistory(); 
  const [genres, set_genres] = useState([]);

  useEffect( () => {

    const get_genre_ids = async () => {
      const genre_req = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`; 
      const res = await axios.get(genre_req); 
      set_genres(res.data.genres);

    };

    get_genre_ids(); 

  }, []);


  function get_selected(select, event){
    // redirect to /films/browse-by/selected 

    let selected = event.target.value; 

    const target = `/films/${select}/${selected.toLowerCase()}`; // ex. genre crime : domain.com/films/genre/crime
    history.push(target, {browseby: select, selected: selected, genres:genres});
  }

  return (
    <Container className="media-width-50">
      <Label>BROWSE BY</Label>

      <Container2>

        <Select onChange={ (event) => get_selected("year", event) }>
          <Option hidden>Year</Option>
          {YEARS.map( (year) => (
            <Option key={year}>{year}</Option>
          ))}
        </Select>

        <Select onChange={ (event) => get_selected("TMDB rating", event) }>
          <Option hidden>TMDB RATING</Option>
          <Option>Highest First</Option>
          <Option>Lowest First</Option>
          {/* <Option>Highest This Year First</Option>
          <Option>Lowest This Year First</Option> */}
        </Select>

        <Select onChange={ (event) => get_selected("popular", event) }>
          <Option hidden>TMDB Film Popularity</Option>
          <Option>Popularity Descending</Option>
          <Option>Popularity Ascending</Option>
        </Select>

        <Select onChange={ (event) => get_selected("genre", event) }>
          <Option hidden>Genre</Option>
          {genres.map( (genre) => (
            <Option key={genre.id}>{genre.name}</Option>
          ))}

        </Select>
        </Container2>
    </Container>
  )
}

// Style 
const Container = styled.div`
  font-family: Roboto; 
  margin-top: 3%; 

  //margin: 3% 0; 

   //width: 50%; 

  // position: relative;
  // left: 24%; 

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
  font-size: 1.2rem; 
`;

export default BrowseBy; 

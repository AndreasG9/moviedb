import React, { useState, useEffect } from "react"; 
import { useHistory } from "react-router-dom"; 
import styled from "styled-components"; 
import axios from "axios"; 


function BrowseBy() {
  // BrowseBy Popular, Rating, Genre, Year 
  // path home/popular/ sorting method , home/rating/ sorting method  .... 

  const YEARS = ["Upcoming", "2020s", "2010s", "2000s", "1990s", "1980s", "1970s", "1960s", "1950s", "1940s", "1930s", "1920s", "1910s", "1900s"]; 

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
    // redirect to /films/?single_param=... (can select multiple param after redirected)

    const selected = event.target.value; 
    let param;

    if(select === "genre") {
      let id = genres.find( (g) => g.name === event.target.value); 
      param = `sort_by=popularity.desc&with_genres=${id.id}`; 
    }
    
    else if(select === "year") {
      if(selected === "Upcoming") {}

      else{
        // ex 2000-01-01 to 2010-01-01
        let year = selected.split("s")[0]; 
      
        let from = `${year}-01-01`;
        let to = `${10 + parseInt(year)}-01-01`; 

        param = `popularity.desc&primary_release_date.gte=${from}&primary_release_date.lte=${to}`; 
      }
    }
    
    else if(select === "TMDB rating") {
      if(selected === "Highest First") param = "vote_average.desc";
      else param = `vote_average.asc`; 
    }

    else if(select === "Year") param = `popularity.desc&year=${selected.toLowerCase()}`; 
    
    else {
      if(selected === "Popularity Descending") param = "popularity.desc";
      else param = "popularity.asc";
    }

    const target = `/films?sort_by=${param}`; 
    console.log(target); 
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
  display: flex; 
  align-items: center; 

  margin-left: 24%; 
 
 @media only screen and (max-width: 1500px) {
    margin-left: 5%;  
  }
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
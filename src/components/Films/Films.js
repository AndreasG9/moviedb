import React, { useState, useEffect } from "react"; 
import styled from "styled-components";
import axios from "axios"; 
import FilmsResults from "./FilmsResults"; 

const YEARS = ["UPCOMING", "2020s", "2010s", "2000s", "1990s", "1980s", "1970s", "1960s", "1950s", "1940s", "1930s", "1920s", "1910s", "1900s"]; 

function Films( {browseby, selected, genres} ) {
  // ex. .../films/genre/crime 
  // DEFAULT sorted by tmdb rating all time (according to tmdb user score which suck)


  // on first render 
  let selected_genre;  
  if(browseby === "genre") selected_genre = genres.find( (g) => g.name === selected); // returns obj with name and id keys 
  else selected_genre = "ALL"; 

  // State 
  const [query_params, set_query_params] = useState(""); 
  const [sort_by, set_sort_by] = useState(" TMDB highest first");

  // will be mutated, initial is a genre or ALL 
  const [genre, set_genre] = useState(selected_genre);


  // initial is a year or ALL 
  const [year, set_year] = useState(browseby);

  const [results, set_results] = useState([]);
  const [current_page, set_current_page] = useState(1); 
  const [total_results, set_total_results] = useState(0); 

  const [loading, set_loading] = useState(false); 


  const [active, set_active] = useState({
    // next and prev buttons 
    prev: false,
    next: true
  });

  // const decade = selected === "year" ? "DECADE" : "ALL"; // FIX FIX 
  // const genre = browseby === "genre" ? selected : "ALL"; 
  // const SORT_BY_DEFAULT_STRING = "TMDB RATING"; 

  useEffect( () => {
    let request = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&include_adult=false&vote_count.gte=40&page=${current_page}`; // base with some default query params 
    let path = `/films`; 

    const get_data = async () => {
      set_loading(true);
      
      // set up query params 
      // RATING TODO 
      // YEAR TODO TODO 
      // if(year !== "genre"){

      // }
      // else set_year("ALL"); 

      // GENRE
      if(genre.id !== 0) { 
        // get correct genre id to add to query 
        console.log("ADDED GENRE"); 
        request += `&with_genres=${genre.id}`;
        path += `/genre/genre.name`; 
       }
      else set_genre({id: 0, name: "All"}); 


      //if(selected === "lowest first") request += `&sort_by=vote_average`; 
      // SORTING (pick one, vote avg desc/ highest rated  is default)
      if(selected === "newest first") request += "&sort_by=release_date.desc"; 
      else if(selected === "earliest first") request += "&sort_by=release_date.asc";

      // most popular all time, this year, this month, or this week 
      else if(selected === "all time") request += "&sort_by=popularity.desc"; 
      else if(selected === "this year") request += `primary_release_year=${new Date().getFullYear()}`; // most popular
      // else if(selected === "this month"){
      //   // year-month-day
      //   // TESTING
      //   const today = "2020-7-27";
      //   const month_ago = "2020-6-27"; 
      //   request += ``
     // }
      // else if(selected === "popularity descending") request += `&sort_by=popularity.desc`;
      // else if(selected === "popularity ascending") request += `&sort_by=popularity.asc`;

      else if(selected === "lowest first") request += "&sort_by=vote_average.asc"; 
      else request += "&sort_by=vote_average.desc" // HIGHEST RATING FIRST IS DEFAULT/ fallback SORTING METHOD 

      //const request = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=${current_page}&vote_count.gte=50&with_genres=80`; 
      

      // finally get the requested data 
      const res = await axios.get(request); 
      set_results(res.data.results); // display 72 posts a page? maybe less 
      set_total_results(res.data.total_results); 
      set_loading(false); 
    }

    get_data();

  }, [current_page, selected, genre.id]); 


  // Funcs. 
  // re-render will new page request 
  const next = () => {
    set_current_page(current_page + 1); 
  }

  const prev = () => {
    set_current_page(current_page - 1); 

    if(current_page === 2) set_active({prev: false, next: true});
    else set_active({prev: true, next: true}); 
  }


  const handle_genre = (event) => {
    // update query, re-render 
    let selected_genre = genres.find( (g) => g.name === event.target.value);
    set_genre(selected_genre); 
  }

  const handle_year = (event) => {
    console.log(event.target.value);

    set_year(event.target.value); 
  }

  const handle_sorting = (event) => {
    console.log(event.target.value); 
  }



  return (

    <Container>

      <HeaderContainer>
        <Title>FILMS</Title>

        <FiltersContainer>
          <Select onChange={handle_year}>
            <Option hidden>YEAR</Option>
            <Option>ALL</Option>
            {YEARS.map( (year) => (
              <Option key={year}>{year}</Option>
            ))}
          </Select>

          <Select onChange={handle_genre}>
            <Option hidden>GENRE</Option>
            <Option>All</Option>
            {genres.map( (genre) => (
              <Option key={genre.id}>{genre.name}</Option> 
            ))}
          </Select>

          <Select  onChange={handle_sorting} >
            <Option hidden>Sort by</Option>

              <Group label="TMDB RATING">
                <Option>Highest First</Option>
                <Option>Lowest First</Option>
              </Group>

              <Group label="FILM POPULARITY">
                <Option>All Time</Option>
                <Option>This Year</Option>
                <Option>This Month</Option>
                <Option>This Week</Option>
              </Group>

              <Group label="RELEASE DATE">
                <Option>Newest First</Option>
                <Option>Earliest First</Option>
              </Group>
          </Select>

        </FiltersContainer>
      </HeaderContainer>

      <SearchResultContainer>
        <Header>There are {total_results} films matching your filters</Header>
        <Filters>
          <Filter>YEAR: {year}</Filter>
          <Filter>GENRE: {genre.name}</Filter>
          <Filter>Sort By: {sort_by}</Filter>
        </Filters>
      </SearchResultContainer>


      <FilmsResults results={results} loading={loading}></FilmsResults>
    

      <ButtonsContainer>
        <Button active={active.prev} onClick={prev}>Previous</Button>
        <Button active={active.next} onClick={next}>Next</Button>
      </ButtonsContainer>
      
    </Container>
  )
}

const Container = styled.div`
  display: flex; 
  flex-direction: column; 
  font-family: Roboto; 
  border: 2px solid black; 
  color: #a5a5a5; 

  //width: 60%; 


  margin: 0 auto; 
`; 

const HeaderContainer = styled.h2`
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  align-items: flex-end; 
  font-size: 1.1em; 
  border-bottom: 1px solid #a5a5a5;
`;

const FiltersContainer = styled.div`
  
`;

const Title = styled.div` 
 
`; 

const Select = styled.select`
  font-family: Roboto;
  
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

const Group = styled.optgroup`
  font-size: 1.1em;
  background-color: #13181c; 
  color: #adadff;
`; 

const Option = styled.option`
  background-color: #8699aa; 
  color: #333; 
  font-size: 1.0rem; 
`; 

const SearchResultContainer = styled.div`
  //margin: 0 auto; 
  margin-left: 18%; 
  padding: 1% 0 2% 0; 

  display: flex; 
  flex-direction: row; 
  align-items: center; 
`;

const Header = styled.div`
  margin-right: 2%; 
`;

const Filters = styled.div`
  display: flex;
  flex-direction: column;
  font-size: .8em; 
  white-space: nowrap;
`;

const Filter = styled.div`
`; 

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  border-top: 1px solid #a5a5a5; 
`; 

const Button = styled.button`
  color: #a5a5a5;
  border-radius: 4px; 

  padding: 10px;  
  width: 8%;

  text-align: center; 
  border: none; 
  background-color: #273038; 
  margin-top: .5%; 

  //transform: ${(props) => props.active ? "scale(1)" : "scale(0)"}; 

  &:hover{
    cursor: pointer;
    color: #e1e3e5;
  }

  &:focus{
    outline: none; 
  }
`;

export default Films; 
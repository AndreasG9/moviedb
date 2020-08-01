import React, { useState, useEffect } from "react"; 
import styled from "styled-components";
import axios from "axios"; 
import FilmsResults from "./FilmsResults"; 

const DECADES = ["Upcoming", "2020s", "2010s", "2000s", "1990s", "1980s", "1970s", "1960s", "1950s", "1940s", "1930s", "1920s", "1910s", "1900s"]; 

function Films( {browseby, selected, genres} ) {
  // ex. .../films/genre/crime (default sorted by popularity (not the biggest fan of how they determine those values))

  // on first render (info from BrowseBy component)
  let selected_genre;  
  if(browseby === "genre") selected_genre = genres.find( (g) => g.name === selected); // returns obj with name and id keys 
  else selected_genre = {id: 0, name: "All"}; 


  let years_arr = []; 
  let decade = "All"; 
  let visible = false; 
  if(browseby === "year"){
    // include a decade
    let a_year = parseInt(selected.substring(0,4)); 
    years_arr.push(selected); 

    for(let i=0; i<10; ++i){
      years_arr.push(a_year); 
      ++a_year; 
    }

    decade = selected; 
    visible = true; 
  }




  let sorted; 
  if(browseby === "TMDB rating" || browseby === "popular") sorted = selected; 
  else sorted = "Popularity Descending"; 


  // State 
  const [query_params, set_query_params] = useState(""); 
  const [genre, set_genre] = useState(selected_genre);   // will be mutated, initial is a genre or ALL 


  const [year, set_year] = useState({
    selected: decade,
    years: years_arr,
    visible: visible
  });

  const [sort_by, set_sort_by] = useState(sorted);
  const [results, set_results] = useState([]);
  const [current_page, set_current_page] = useState(1); 
  const [total_results, set_total_results] = useState(0); 
  const [loading, set_loading] = useState(false); 

  const [btn_active, set_btn_active] = useState({
    // prev and next buttons 
    prev: false,
    next: true
  });

  useEffect( () => {
    let request = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&include_adult=false&vote_count.gte=40&page=${current_page}`; // base with some default query params 
    let query = ""; 
    //let path = `/films`; // update 

    const get_data = async () => {
      document.querySelector('body').scrollTo(0,0); // select new page, make sure start at the top 
      set_loading(true);
      
      // set up query params 
    
      // ------------------------------------SORT BY-----------------------------------------------------
      // Release Date 
      if(sort_by === "Release Date Descending"){
        // starting with films released before today  
        const today = new Date().toISOString().slice(0,10); // (yyyy-mm-dd)
        query += `&sort_by=primary_release_date.desc&primary_release_date.lte=${today}`;
      }
      else if(sort_by === "Release Date Ascending") request = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&include_adult=falsepage=${current_page}&sort_by=primary_release_date.asc`; // removed min vote count  

      // Rating 
      else if(sort_by === "Highest First") query += "&sort_by=vote_average.desc&without_genres=10770&vote_count.gte=100&primary_release_date.lte=2020-01-01"; // fix later 
      else if(sort_by === "Lowest First") query += "&sort_by=vote_average.asc";

      // Most popular today desc or asc  
      else if(sort_by === "Popularity Ascending") query += "&sort_by=popularity.asc"; 
      else query += "&sort_by=popularity.desc"; // most popular/ popular today is default / fallback sorting method 


      // ------------------------------------YEAR----------------------------------------------------
      if(year.selected !== "All"){
        // narrow results to a decade or specific year 

        if(isNaN(year.selected)){

          if(year.selected === "Upcoming"){
            // upcoming (any release past current date)
            let date = new Date().toISOString().slice(0,10);  
            query += `&release_date.gte=${date}`; 
          }
          else{
            // show results for that decade (ex. 2000-01-01 - 2010-01-01);  
            let from = `${year.years[1]}-01-01`;
            let to = `${year.years[10]+1}-01-01`; // +1 b/c last year is xxx9
            query += `&primary_release_date.gte=${from}&primary_release_date.lte=${to}`;
          }
        }

        else query += `&primary_release_year=${year.selected}`;           // specific year 
      }


      // ------------------------------------GENRE-----------------------------------------------------
      if(genre.id !== 0) { 
        // get correct genre id to add to query 
        query += `&with_genres=${genre.id}`;
        //path += `/genre/genre.name`; 
        }
      else set_genre({id: 0, name: "All"}); 

      // finally get the requested data  
      request += query; 
      const res = await axios.get(request);    
      set_results(res.data.results); // display 72 posts a page? maybe less 
      set_total_results(res.data.total_results); 
      set_loading(false); 

      // if new filter, reset current page 
      if((query_params !== query) && (query_params !== "")) set_current_page(1); 
      set_query_params(query); 
    }

    get_data();

  }, [current_page, selected, genre.id, sort_by, query_params, year.selected, year.years]); 


  // Funcs. 
  function show_years(){
    // horizontal list of buttons with a decade and its years 
    let res = null; 
 
    if(year.selected !== "All"){
      res = 
        <React.Fragment>{
          year.years.map( (year) => (
            <Year key={year} onClick={(event) => handle_year(year)}>{year}</Year>
          ))}
        </React.Fragment>
    }

    return res; 
  }

  // re-render will new page request 
  const next = () => {
    set_current_page(current_page + 1); 

    if(current_page === Math.floor(total_results / 20)) set_btn_active({prev: true, next: false})
    else set_btn_active({prev: true, next: true}); 
  }

  const prev = () => {
    set_current_page(current_page - 1); 

    if(current_page === 2) set_btn_active({prev: false, next: true});
    else set_btn_active({prev: true, next: true}); 
  }

  const handle_genre = (event) => {
    // update query, re-render 
    let selected_genre;
    if(event.target.value === "All") selected_genre = {id: 0, name: "All"}; // if select all, change id to 0 and query will not include a genre 
    else selected_genre = genres.find( (g) => g.name === event.target.value);

    set_genre(selected_genre); 
  }

  const handle_sorting = (event) => {
    set_sort_by(event.target.value);
  }

  const handle_years = (event) => {
    // Decade or Upcoming 
    // if decade, fill years 

    let years_arr = []; 
    let visible = false; 

    if(event.target.value !== "Upcoming"){
      visible = true; 
      let a_year = parseInt(event.target.value.substring(0,4)); 
      years_arr.push(event.target.value); 

      for(let i=0; i<10; ++i){
        years_arr.push(a_year); 
        ++a_year; 
      }
    }
    
    set_year({
      selected: event.target.value,
      years: years_arr,
      visible: visible
    }); 

  }

  const handle_year = (selected_year) => {
    // Specific year 
    let temp = {...year};
    temp.selected = selected_year; 
    set_year(temp);   
  }

  const reset = () => {
    // set search to year: all genre: all sort by: pop descending
    set_sort_by("Popularity Descending");
    set_year({
      selected: "All",
      years: [],
      visible: false
    });
    set_genre({id: 0, name: "All"});

    document.getElementById("year-id").selectedIndex = 0; 
    document.getElementById("genre-id").selectedIndex = 0; 
    document.getElementById("sort-by-id").selectedIndex = 0; 
  }



  return (
    <Container className="media-width-50">

      <HeaderContainer>
        <div>FILMS</div>

        <div>
          <Select onChange={handle_years} id="year-id">
            <Option hidden>Year</Option>
            <Option>All</Option>
            {DECADES.map( (year) => (
              <Option key={year}>{year}</Option>
            ))}
          </Select>

          <Select onChange={handle_genre} id="genre-id">
            <Option hidden>Genre</Option>
            <Option>All</Option>
            {genres.map( (genre) => (
              <Option key={genre.id}>{genre.name}</Option> 
            ))}
          </Select>

          <Select onChange={handle_sorting} id="sort-by-id">
            <Option hidden>Sort by</Option>

            <Group label=" TMDB FILM POPULARITY">
                <Option>Popularity Descending</Option>
                <Option>Popularity Ascending</Option>
              </Group>

              <Group label="TMDB RATING (awful system)">
                <Option>Highest First</Option>
                <Option>Lowest First</Option>
              </Group>

              <Group label="RELEASE DATE">
                <Option>Release Date Descending</Option>
                <Option>Release Date Ascending</Option>
              </Group>
          </Select>
        </div>
      </HeaderContainer>


      <SearchResultContainer>
        <Header>There are {total_results} films matching your filters</Header>
        <Filters>
          <div>Year: {year.selected}</div>
          <div>Genre: {genre.name}</div>
          <div>Sort By: {sort_by}</div>
          <ResetButton onClick={reset}>Reset</ResetButton>
        </Filters>
      </SearchResultContainer>



      <YearsContainer visible={year.visible}>
        {show_years()}
      </YearsContainer>


      <FilmsResults results={results} loading={loading}></FilmsResults>
    

       <ButtonsContainer>
        <Button active={btn_active.prev} onClick={prev}>Previous</Button>
            <span>{query_params}</span>
        <Button active={btn_active.next} onClick={next}>Next</Button>
      </ButtonsContainer> 
      
    </Container>
  )
}

const Container = styled.div`
  display: flex; 
  flex-direction: column; 
  font-family: Roboto; 
  color: #a5a5a5; 
`; 

const HeaderContainer = styled.h2`
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  align-items: flex-end; 
  font-size: 1.1em; 
  border-bottom: 1px solid #a5a5a5;
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

const ResetButton = styled.button`
  padding: 5px; 
  color: #a5a5a5;
  border-radius: 4px; 
  border: none; 
  background-color: #273038; 
  margin-top: 2%;

  &:hover{
    cursor: pointer; 
    color: #e1e3e5;
  }

  &:focus{
    outline: none; 
  }

`;

const YearsContainer = styled.div`
  transform: ${(props) => props.visible ? "scale(1)" : "scale(0)"};

  margin: 0 auto; 
  display: flex;
  flex-direction: row; 
  padding-bottom: 15px; 
`; 

const Year = styled.button`
  color: #a5a5a5;
  border: none;
  background-color: #1a2127; 
  outline: 2px solid #31383e; 
  font-size: 1.0em; 
  
  padding: 5px 20px;  

  &:hover{
    cursor: pointer; 
    color: #fff; 
  }

  &:focus{
    color: #fff; 
    background-color: #6f7d89; 
  }
`; 

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
  border-top: 1px solid #a5a5a5; 
  padding-top: 2%; 
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

  transform: ${(props) => props.active ? "scale(1)" : "scale(0)"}; 

  &:hover{
    cursor: pointer;
    color: #e1e3e5;
  }

  &:focus{
    outline: none; 
  }
`;

export default Films; 